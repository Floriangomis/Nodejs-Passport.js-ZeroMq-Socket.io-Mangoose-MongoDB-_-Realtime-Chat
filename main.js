const config = {};
const app = require('express')();
require('./config-middleware.js')(app, config);
const api = require('./routing/index.js')(app, config);
const server = require('./real-time/index.js')(app);
    

server.listen(3000, () => {
    console.log('Listening on port 3000');
});