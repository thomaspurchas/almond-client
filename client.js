"use strict";

var util = require('util');
var WebSocket = require('ws');
var EventEmitter = require('events').EventEmitter;
var debug = require('debug')('almond-client');
var randomstring = require("randomstring");
var deviceProps = require("./deviceProperties.js");

var AlmondClient = module.exports = function(config) {
    EventEmitter.call(this);
    this.host = config.host;
    this.port = config.port;

    this.username = config.username;
    this.password = config.password;

    var url = util.format("ws://%s:%s/%s/%s", this.host, this.port, this.username, this.password)
    this.ws = new WebSocket(url);
    this.wsEmitter = new WebSocketEmitter();

    this._devices = {};

    var self = this;
    this.ws.on('open', function open() {
        self._getGeviceList();
        self.once("gotDeviceList", function() {
            self.emit("ready");
        });
    });

    this.ws.on('message', this._recvMessage.bind(this));
    this.wsEmitter.on("dynamicMessage", this._processDynamicMessage.bind(this));
}

util.inherits(AlmondClient, EventEmitter);

AlmondClient.DEVICE_TYPE = require("./deviceTypes.js")

AlmondClient.prototype.getDevices = function() {
    var devices = [];
    for (var device in this._devices) {
        devices.push(this._devices[device]);
    }
    return devices;
}

AlmondClient.prototype.getDeviceById = function(id) {
    return this._devices[id];
}

AlmondClient.prototype._getGeviceList = function() {
    var self = this;
    this._sendMessage({
        "CommandType":"DeviceList"
    }, function(err, data) {

        var devices = data.Devices;
        for (var deviceID in devices) {
            if (!(devices[deviceID].ID in self._devices)) {
                self._addDevice(devices[deviceID]);
            }
        }

        self.emit("gotDeviceList")
    });
}

AlmondClient.prototype._processDynamicMessage = function(message) {
    debug("Got dynamicMessage", message);

    switch(message.CommandType) {
        case "DynamicIndexUpdated":
            this._processDeviceUpdate(message);
            break;
        default:
            debug("Didn't understand message");
    }
}

AlmondClient.prototype._processDeviceUpdate = function(message) {
    debug("Got device update msg", message)
    var devices = message.Devices;
    for (var deviceID in devices) {
        var deviceValues = devices[deviceID].DeviceValues;
        var device = this._devices[deviceID];

        for (var index in deviceValues) {
            device.updateProp(index, deviceValues[index].Value);
        }
    }
}

AlmondClient.prototype._addDevice = function(devData) {
    debug("Adding device", devData);
    var device = new AlmondDevice(this, devData);

    this._devices[device.id] = device;
    this.emit("deviceAdded", device);
}

AlmondClient.prototype._sendMessage = function(json, cb) {
    var mii = randomstring.generate();

    json["MobileInternalIndex"] = mii;

    var msg = JSON.stringify(json);
    this.ws.send(msg);
    debug("Message Sent", msg);

    this.wsEmitter.on(mii, cb.bind(this));
}

AlmondClient.prototype._recvMessage = function(message) {
    debug("Message Recved", message);

    var json = JSON.parse(message);
    var mii = json["MobileInternalIndex"];

    if (typeof mii === "undefined") {
        debug("Got dynamic message");
        this.wsEmitter.emit("dynamicMessage", json);
    } else {
        this.wsEmitter.emit(mii, null, json);
    }
}

var AlmondDevice = function(client, config) {
    EventEmitter.call(this);
    this.client = client;

    this.id = config.Data.ID;
    this.name = config.Data.Name;
    this.type = config.Data.Type;
    this.location = config.Data.location;
    this.manufacturer = config.Data.Manufacturer || "Unknown Manufacturer";
    this.model = config.Data.Model || "Unknown Model";

    this.props = deviceProps[this.type];

    this._deviceValues = {};

    for (var id in config.DeviceValues) {
        this._deviceValues[id] = {
            id: id,
            name: config.DeviceValues[id].Name,
            value: config.DeviceValues[id].Value
        };
    }
}

AlmondDevice.prototype.setProp = function(prop, value) {
    var self = this;

    this.client._sendMessage({
        "CommandType":"UpdateDeviceIndex",
        "ID": this.id,
        "Index": prop,
        "Value": value
    }, function(err, message) {
        if (message.Success) {
            debug("Successfully updated value", prop, "to", value)
            self.updateProp(prop, value);
        }
    });
}

AlmondDevice.prototype.getProp = function(prop) {
    return this._deviceValues[prop];
}

AlmondDevice.prototype.updateProp = function(prop, value) {
    if (typeof this._deviceValues[prop] === "undefined") return;
    if (this._deviceValues[prop].value === value) return;

    debug("Updating value", prop, "from", this._deviceValues[prop].value, "to", value);
    this._deviceValues[prop].value = value;
    this.emit("valueUpdated", prop, value);
}

util.inherits(AlmondDevice, EventEmitter);

var WebSocketEmitter = function() {
    EventEmitter.call(this);
}

util.inherits(WebSocketEmitter, EventEmitter);