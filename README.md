<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework Chat App as a proof of concept.
### Prerequisites  
  
-  Node v12 LTS
-  MongoDB
-  Postman
  ### Languages, libraries and tools used

-   [NestJs](https://docs.nestjs.com/)
-   [Socket.io](https://socket.io/)
-   [Mongoose ODM](https://mongoosejs.com/)
-   [Docker](https://www.docker.com/)
-   [Swagger API](https://swagger.io/)
-   [Socketio client tool](https://amritb.github.io/socketio-client-tool/)


## Running the app

```bash
# build docker image for the app
$ docker build -t mokhaled3003/chatapp .
$ docker pull mongo:latest
$ docker-compose up

# development mode
$ npm install
$ npm start


## Test

# unit tests
$ npm run test
```
- visit [Chat App Api Docs](http://localhost:3000/api) to find Users Module Api Docs.
- visit [Socketio client tool](https://amritb.github.io/socketio-client-tool/) to test the Chat Gateway Events
- please provide the access token from the responce Login ENDPOINT in the following object and provide it to   socketio-client-tool in the 'socketio options json' to initiate the connection successfully else you won't be able to connect to the websocket server.
```javascript
{
  "query":
     {
        "token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJ0ZXN0IiwiaWF0IjoxNjA2NjAwNTg4fQ.J04x78GKIChkAodMDeNUhmsrM7OI2Lun1k8mkegq-NM"
     }
}
```
- ![explain screenshot](/docs/images/Socket-io-client-tool.png?raw=true)

- you must provide the message in the form of JSON object or it will be rejected by validation pipes

```javascript
{
  "text": "Hello World!"
}
```

- ![explain screenshot](/docs/images/Socket-io-client-tool1.png?raw=true) 

- you can listen to the 'clientToServer' Event and Emit to 'messageToServer' Event
## Support
- please note that in development mode you must change mongoose connection string in '.env' file at MONGODBDEV
- please note that in running from docker-copmose file you will be in production mode it will switch connection to MONGODBPROD so please if you have any mongod service running in your host on port 27017 it will stop excutting containrization process,because i run the mongo service inside the container in the same port and exposing it to 27017.

```bash
# stop mongo local server before docker-compose up
$ service mongod stop
```

 i have used passport-jwt as my third party authentication service , so in './src/users/jwt.strategy.ts' you will find i have made custom jwt token extractor to extract token from query param in websocket connection to allow only authenticated users to connect to messages service websocket server.
```javascript
  jwtFromRequest : function(client) {
                var token = null;
                if (client && client.handshake.query.token) {
                    token = client.handshake.query.token;
                }
                return token;
            },
```
i have extended the Logger Class in nestjs to provide saving logs to file './log.txt' you can find implementation
```javascript
  
import { Logger } from '@nestjs/common';
import * as fs from 'fs'
export class MyLogger extends Logger {
  log(message: string, trace: string) {
    console.log(trace)
    fs.appendFile('logs.txt',`${trace}  ${message}\r\n`,(err)=>{
    })
    super.log(message, trace);
  }
  verbose(message: string, trace: string) {
    console.log(trace)
    fs.appendFile('logs.txt',`${trace}  ${message}\r\n`,(err)=>{
    })
  super.verbose(message, trace);
}
}
```
  i have implemented validation pipe for user registration
```javascript
  
import { ApiProperty } from '@nestjs/swagger';
import { IsString,MinLength,MaxLength, IsNotEmpty } from 'class-validator'
export class CreateUserDTO {

@ApiProperty()
@IsString()
@MinLength(4)
@MaxLength(10)
@IsNotEmpty()
readonly username: string;

@IsString()
@MinLength(4)
@MaxLength(10)
@IsNotEmpty()
@ApiProperty()
password: string;
}
```
  as per our technical interview you asked me what will happen if database container crashed , i used volume to persist data 
```javascript
 volumes:
      - mongodata:/data/db
```
## Stay in touch

- Author - [Mohamad Khaled](https://www.linkedin.com/in/engmokhaled/)
