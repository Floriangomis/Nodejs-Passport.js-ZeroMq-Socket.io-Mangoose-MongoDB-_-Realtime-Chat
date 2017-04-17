# Realtime Chat

I started this app to start to play with Node.js / Socket.io and ZeroMQ initially.

I Then started to use also Passport.js/ MongoDB and Mongoose.

# Requirement

You need to have MongoDB installed on your machine in order to try it locally.
You also need to have NodeJS installed ( Npm ).

# How to Launch it

First your mongoDB database should be running.
( mongod --dbpath=/data - On my machine )


Then you should check in config.js that the address to MongoDB server is correct ( localhost by default ) and the same for webserver adress ( localhost by default ).
If that's not the case you should change the address you're aiming.

```
$ cd path/to/your/project
$ npm install
$ npm run start
```

And here we are ! You can now access the chat via localhost:3000

Keep in mind that currently the front-end is really trivial. The purpose of this project was to use Nodejs.

To create a new user use the 2 top inputs and then Login with the 2 bottom input.

# TODO :

- Rewrite the front-end part. ( Angular 2 app probably )
- During the register flow we should be able to attach a picture to an account. (Have a look at AWS from Amazon.)
