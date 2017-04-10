module.exports = (app) => {
    const utility = require('../utility/index.js');
    const http = require('http').Server(app);
    const io = require('socket.io')(http);
    const moment = require('moment');
    const mongoDb = require('../mongo-db/index.js');
    
    let listOfUsers = [];
    let history = [];

    io.on('connection', function(socket){

        mongoDb.fetchMessagesFromHistory(socket);

        let disconnectedUser = () => {
            let index = utility.findObjectInArray(listOfUsers, socket.id);
            if( listOfUsers[index] &&  listOfUsers[index].name ) {
                // Broadcast to warn all user
                io.emit('server-msg-client', { time:  moment().format("MM-DD-YYYY-HH:mm"), postedBy: { username: listOfUsers[index].name }, message: 'just leaved the room' });

                // We remove this user from the array and update all user from the chat.
                listOfUsers.splice(index, 1);
                io.emit('update-client-list', listOfUsers);
            }
        };

        let nameReceived = (session) => {
            // Name is not taken.
            if( utility.isNameAlreadyInUse(listOfUsers, session.username) === -1 ) {
                // We send a broadcast to all other user to warn them that a user just entered in a room
                socket.broadcast.emit('server-msg-client', { time:  moment().format("MM-DD-YYYY-HH:mm"),  postedBy: { username: session.username }, message: 'just entered in the room' } );

                //We push into the array the name of the new user
                listOfUsers.push( {name: session.username, id: socket.id, id_user: session.id} );
                io.emit('update-client-list', listOfUsers);
                
                // we keep a track of the index of the customer in index variable
                let index = utility.findObjectInArray(listOfUsers, socket.id);
                socket.emit('name-correct');
            }
            // A user already use that name 
            else {
                socket.emit('name-already-taken');
            }
        };

        let messageReceived = (msg) => {
            let index = utility.findObjectInArray(listOfUsers, socket.id);
            let message = { time:  moment().format("MM-DD-YYYY-HH:mm"), postedBy: { username: listOfUsers[index].name }, user_id: listOfUsers[index].id_user, message: msg };

            
            mongoDb.saveMessageInDb(message);
            
            io.emit('server-msg-client', message );
        };

        let userIsTyping = () => {
            let index = utility.findObjectInArray(listOfUsers, socket.id);
            socket.broadcast.emit('user-started-typing-to-client', listOfUsers[index]);
        };

        let userFinishedTyping = () => {
            let index = utility.findObjectInArray(listOfUsers, socket.id);
            socket.broadcast.emit('user-finished-typing-to-client', listOfUsers[index]);
        };
        
        socket.on('user-is-typing', userIsTyping);
        socket.on('user-stop-typing', userFinishedTyping);
        socket.on('client-message-server', messageReceived )
        socket.on('send-name', nameReceived );
        socket.on('disconnect', disconnectedUser);
    });

    return http;
}