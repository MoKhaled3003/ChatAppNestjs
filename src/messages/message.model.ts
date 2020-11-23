import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;
import {CreateUserDTO} from '../users/users.dto'
export const MessageSchema = new mongoose.Schema({
  text: String,
  owner: {type : Schema.Types.String,ref : 'User'}
},{ timestamps: { createdAt: 'created_at' } });

export interface Message extends mongoose.Document {
  text: string;
  owner: CreateUserDTO;
 }