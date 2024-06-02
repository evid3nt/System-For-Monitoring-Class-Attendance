var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://161.53.19.19:45883', {
    username: "SKc4D94R0BNwdazDAa2T"
});

client.on('connect', function () {
    console.log('connected');
    client.subscribe('classrooms/#');
    // var requestId = 1;
    // var request = {
    //     "method": "getCurrentTime",
    //     "params": {}
    // };
    // client.publish('v1/devices/me/rpc/request/' + requestId, JSON.stringify(request));
});

client.on('message', function (topic, message) {
    console.log('response.topic: ' + topic);
    console.log('response.body: ' + message.toString());
});
