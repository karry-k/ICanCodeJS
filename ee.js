var EventEmitter = require('events').EventEmitter;

var emitter = new EventEmitter;

emitter.on('request', function(request){
    console.log(request);
});

emitter.emit('request', {from: "client"});
