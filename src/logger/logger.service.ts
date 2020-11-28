import {
  Logger
} from '@nestjs/common';
import * as fs from 'fs'
//extending logger class to add fs module append file function to persist logss
export class MyLogger extends Logger {
  log(message: string, trace: string) {
    fs.appendFile('logs.txt', `${trace}  ${message}\r\n`, (err) => {})
    super.log(message, trace);
  }
  verbose(message: string, trace: string) {
    fs.appendFile('logs.txt', `${trace}  ${message}\r\n`, (err) => {})
    super.verbose(message, trace);
  }
  error(message: string, trace: string) {
    fs.appendFile('logs.txt', `${trace}  ${message}\r\n`, (err) => {})
    super.error(message, trace);
  }
  debug(message: string, trace: string) {
    fs.appendFile('logs.txt', `${trace}  ${message}\r\n`, (err) => {})
    super.debug(message, trace);
  }
  warn(message: string, trace: string) {
    fs.appendFile('logs.txt', `${trace}  ${message}\r\n`, (err) => {})
    super.warn(message, trace);
  }
}