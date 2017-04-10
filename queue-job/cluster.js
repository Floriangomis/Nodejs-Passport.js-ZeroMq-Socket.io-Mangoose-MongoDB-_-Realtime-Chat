'use strict';

const 
    cluster = require('cluster'),
    zmq = require('zmq'),
    fs = require('fs');


if (cluster.isMaster) {
    
    let counter = 0;
    let pusher = zmq.socket('push').bind('tcp://127.0.0.1:53434');
    let puller = zmq.socket('pull').bind('tcp://127.0.0.1:53433');

    puller.on('message', (message) =>{
        let parsedMessage = JSON.parse(message);

        if(parsedMessage.state && parsedMessage.state === 'ready'){
            counter++;
            console.log('worker ready : ' + counter + '/3');
            if(counter === 3){
                for (var i = 0; i < 30; i++) {
                    pusher.send( JSON.stringify({
                        data: 'data'+i.toString(),
                        timestamp: Date.now().toString()
                    }))                    
                }
            }
        } else {
            console.log('Result final' + parsedMessage.response + ' from worker ' + parsedMessage.pid);
            pusher.send( JSON.stringify({
                data: 'data Resend ' + Date.now(),
                timestamp: Date.now().toString()
            }))        
        }
    });

    for (let i = 0; i < 3; i++) {
        cluster.fork();
    }

} else { 

    let pusher = zmq.socket('push').connect('tcp://127.0.0.1:53433');

    let puller = zmq.socket('pull').connect('tcp://127.0.0.1:53434');

    puller.on('message', (data) => {
        let job = JSON.parse(data);
        pusher.send(JSON.stringify({response: job.data, pid: process.pid}));
    });

    console.log('send Ready');
    pusher.send(JSON.stringify({state: 'ready'}));
}