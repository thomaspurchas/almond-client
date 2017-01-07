"use scrict";
var deviceTypes = require('./deviceTypes.js');

//]  Mapping device properties to their indexs.
// Taken from =  https://wiki.securifi.com/index.php/Devicelist_Documentation
// Note that the mapping names are not identical e.g. Thermostat
// This is so that it's easier to determine device capabilities, thus you should
// always check this file!

var props = module.exports = {}
props[deviceTypes.BinarySwitch]  =  {
    SwitchBinary: 1
}
props[deviceTypes.MultilevelSwitch]  =  {
    SwitchMultilevel: 1
}
props[deviceTypes.BinarySensor]  =  {
    SensorBinary: 1,
    Battery: 2,
    Tamper: 3
}
props[deviceTypes.MultilevelSwitchOnOff]  =  {
    SwitchMultilevel: 1,
    SwitchBinary: 2
}
props[deviceTypes.DoorLock]  =  {
    State: 1,
    Config: 2,
    Battery: 3,
    MaximumUsers: 4
}
props[deviceTypes.Alarm]  =  {
    Basic: 1,
    Battery: 2
}
props[deviceTypes.Thermostat]  =  {
    Temperature: 1,
    Mode: 2,
    OperatingState: 3,
    SetpointHeating: 4,
    SetpointCooling: 5,
    FanMode: 6,
    FanState: 7,
    Battery: 8,
    Units: 9,
    Humidity: 10
}
props[deviceTypes.Controller]  =  {

}
props[deviceTypes.SceneController]  =  {
    Config: 1
}
props[deviceTypes.StandardCIE]  =  {
    State: 1,
    LowBattery: 2,
    Tamper: 3
}
props[deviceTypes.MotionSensor]  =  {
    State: 1,
    LowBattery: 2,
    Tamper: 3,
    Temperature: 4
}
props[deviceTypes.ContactSwitch]  =  {
    State: 1,
    LowBattery: 2,
    Tamper: 3,
    Temperature: 4
}
props[deviceTypes.FireSensor]  =  {
    State: 1,
    LowBattery: 2,
    Tamper: 3
}
props[deviceTypes.WaterSensor]  =  {
    State: 1,
    LowBattery: 2,
    Tamper: 3,
    Temperature: 4
}
props[deviceTypes.GasSensor]  =  {
    State: 1,
    LowBattery: 2,
    Tamper: 3
}
props[deviceTypes.PersonalEmergencyDevice]  =  {
    State: 1,
    LowBattery: 2,
    Tamper: 3
}
props[deviceTypes.VibrationOrMovementSensor]  =  {
    State: 1,
    LowBattery: 2,
    Tamper: 3
}
props[deviceTypes.RemoteControl]  =  {
    State: 1,
    LowBattery: 2,
    Tamper: 3
}
props[deviceTypes.KeyFob]  =  {
    ArmMode: 1,
    PanicAlarm: 2,
    EmergencyAlarm: 3
}
props[deviceTypes.Keypad]  =  {
    State: 1,
    LowBattery: 2,
    Tamper: 3
}
props[deviceTypes.StandardWarningDevice]  =  {
    State: 1,
    LowBattery: 2,
    Tamper: 3
}
props[deviceTypes.SmartACSwitch]  =  {
    SwitchBinary: 1,
    FrequencyMultiplier: 2,
    FrequencyDivisor: 3,
    PowerMultiplier: 4,
    PowerDivisor: 5,
    VoltageMultiplier: 6,
    VoltageDivisor: 7,
    CurrentMultiplier: 8,
    CurrentDivisor: 9,
    Frequency: 10,
    ActivePower: 11,
    RMSVoltage: 12,
    RMSCurrent: 13
}
props[deviceTypes.SmartDCSwitch]  =  { // NOTE: This may be incorrect! If it is, submit an issue
    SwitchBinary: 1,
    PowerMultiplier: 2,
    PowerDivisor: 3,
    VoltageMultiplier: 4,
    VoltageDivisor: 5,
    CurrentMultiplier: 6,
    CurrentDivisor: 7,
    Power: 8,
    Voltage: 9,
    Current: 10
}
props[deviceTypes.OccupancySensor]  =  {
    State: 1,
    Temperature: 2,
    Humidity: 3,
    LowBattery: 4
}
props[deviceTypes.LightSensor]  =  {
    Illuminance: 1,
    Battery: 2
}
props[deviceTypes.WindowCovering]  =  {} // No data :(
props[deviceTypes.TemperatureSensor]  =  {
    Temperature: 1,
    Humidity: 2,
    Battery: 3
}
props[deviceTypes.ZigbeeDoorLock]  =  {
    LockState: 1
}
props[deviceTypes.ZigbeeTempSensor]  =  {
    Temperature: 1
}
props[deviceTypes.PressureSensor]  =  {
    SensorMultilevel: 1,
    Tolerance: 2
}
props[deviceTypes.FlowSensor]  =  {
    SensorMultilevel: 1,
    Tolerance: 2
}
props[deviceTypes.ColorDimmableLight]  =  {
    SwitchMultilevel: 1,
    SwitchBinary: 2,
    Hue: 3,
    Saturation: 4,
    ColorTemperature: 5
}
props[deviceTypes.HAPump]  =  {
    SwitchBinary: 1,
    Status: 2,
    Capacity: 3
}
props[deviceTypes.Shade]  =  {
    SwitchBinary: 1,
    SwitchMultilevel: 2,
    Status: 3
}
props[deviceTypes.SmokeDetector]  =  {
    Status: 1,
    Battery: 2
}
props[deviceTypes.FloodSensor]  =  {
    Status: 1,
    Battery: 2
}
props[deviceTypes.ShockSensor]  =  {
    SensorBinary: 1,
    Battery: 2
}
props[deviceTypes.DoorSensor]  =  {
    SensorBinary: 1,
    Battery: 2
}
props[deviceTypes.MoistureSensor]  =  {
    Temperature: 1,
    SensorMultilevel: 2
}
props[deviceTypes.MovementSensor]  =  {
    SensorBinary: 1,
    Battery: 2
}
props[deviceTypes.MultiSwitch]  =  { // NOTE: Not sure about this :(
    SwitchBinary1: 1,
    SwitchBinary2: 2
}
props[deviceTypes.UnknownOnOffModule]  =  {
    SwitchBinary: 1
}
props[deviceTypes.BinaryPowerSwitch]  =  {
    SwitchBinary: 1,
    Power: 2
}
props[deviceTypes.SetPointThermostat]  =  {
    Setpoint: 1,
    Battery: 2,
    Units: 3,
    Temperature: 4
}
props[deviceTypes.HueLamp]  =  {
    HueBridgeId: 1,
    SwitchBinary: 2,
    Hue: 3,
    Saturation: 4,
    SwitchMultilevel: 5,
    Effect: 6,
    ColorMode: 7,
    HueBulbId: 8,
    UserName: 9,
    Reachable: 10
}
props[deviceTypes.MultiSensor]  =  {
    State: 1,
    Battery: 2,
    Illuminance: 3,
    Temperature: 4,
    Humidity: 5
}
props[deviceTypes.SecurifiSmartSwitch]  =  {
    SwitchBinary: 1,
    FrequencyMultiplier: 2,
    FrequencyDivisor: 3,
    PowerMultiplier: 4,
    PowerDivisor: 5,
    VoltageMultiplier: 6,
    VoltageDivisor: 7,
    CurrentMultiplier: 8,
    CurrentDivisor: 9,
    Frequency: 10,
    ActivePower: 11,
    RMSVoltage: 12,
    RMSCurrent: 13
}
props[deviceTypes.RollerShutter]  =  {
    SwitchMultilevel: 1,
    Status: 2,
    Stop: 3
}
props[deviceTypes.GarageDoorOpener]  =  { // NOTE: Not sure here either
    BarrierOperator: 1
}
props[deviceTypes.ZWtoACIRExtender]  =  {
    SensorMultilevel: 1,
    Mode: 2,
    SetpointHeating: 3,
    SetpointCooling: 4,
    FanMode: 5,
    Battery: 6,
    Units: 7,
    Swing: 8,
    Status: 9,
    IRCode: 10,
    Config: 11
}
props[deviceTypes.MultiSoundSiren]  =  {
    MultilevelSwitch: 1
}
props[deviceTypes.EnergyReader]  =  {
    Battery: 1,
    Power: 2,
    Energy: 3,
    Clamp1Power: 4,
    Clamp2Energy: 5,
    Clamp2Power: 6,
    Clamp2Energy: 7
}
props[deviceTypes.NestThermostat]  =  57, // For later
props[deviceTypes.NestSmokeDetector]  =  58
