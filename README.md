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

[Nest](https://github.com/nestjs/nest) framework Chat App as a proof of concept kindly find postman collection save in root directory to test APIs .

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
- visit [Socketio client tool](https://amritb.github.io/socketio-client-tool/) to test the Chat Gateway Events
- ![explain screenshot](/docs/images/Socket-io-client-tool.png?raw=true) 
- ![explain screenshot](/docs/images/Socket-io-client-tool(1).png?raw=true) 

## Support
- 
- please note that in development mode you must change mongoose connection string in '.env' file 

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
