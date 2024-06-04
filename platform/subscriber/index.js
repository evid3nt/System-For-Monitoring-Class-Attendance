var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://161.53.19.19:45883', {
    username: process.env.MQTT_DEVICE_ACCESS_TOKEN ?? "h1kV2tjEkZ1zCdvJ54oQ"    // Device access token
});

// export MQTT_TELEMETRY_TOPIC=v1/buildings/d/classrooms/d2
const topic = process.env.MQTT_TELEMETRY_TOPIC ?? "v1/buildings/a/classrooms/a102";

client.on('connect', function () {
    console.log("Connected!");
    
    client.subscribe(topic, { topic: { qos: 1 } }, (err, granted) => {
        if (!err) {
            console.log("Subscribed!");
            console.log(JSON.stringify(granted));
        } else {
            console.log("Error while subscribing:");
            console.log(JSON.stringify(error));
        }
    });
});

client.on('message', function (topic, message) {
    console.log('response.topic: ' + topic);
    console.log('response.body: ' + message.toString());
});
