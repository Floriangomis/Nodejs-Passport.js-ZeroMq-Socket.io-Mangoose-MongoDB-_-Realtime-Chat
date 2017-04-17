(function(exports){
   exports.ConfigObject = {
        webserverIpServer: "localhost",
        ipServerMongoDb: "localhost:27017/chatdb"
    };
})(typeof exports === 'undefined' ? this['config']={} : exports); // Here we check of exoprts is there for Nodejs if not this mean we are in a browser and then we simply push this value in global context.