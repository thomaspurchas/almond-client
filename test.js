var almondclient = require("./client.js");

client = new almondclient({host:"10.10.10.124",port: "7681",username: "root",password: "godet"});

client.on("ready", function() {
    console.log("Ready", this);
    console.log(this.devices["1"]);
    this.devices["1"].setValue("1", true);
    this.devices["1"].on("valueUpdated", function(id, value) {
        console.log(["afewf", id, value]);

        if (id == "1" && value == "true") {
            console.log("Turning light off again")
            this.setValue("1", false);
        }
    })
})

