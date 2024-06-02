var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://161.53.19.19:45883', {
    username: "SKc4D94R0BNwdazDAa2T"
});

client.on('connect', function () {
    console.log("Connected!");
    
    client.subscribe("$share/group/v1/classrooms/a-201", { "$share/group/v1/classrooms/a-201": { qos: 1 } }, (err, granted) => {
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
