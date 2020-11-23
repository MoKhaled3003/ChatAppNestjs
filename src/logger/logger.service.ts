
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