import * as mongoose from 'mongoose';
import * as _ from 'lodash';

const Schema = mongoose.Schema;

export const UserSchema = new mongoose.Schema({
  username: {type: String, required: true,unique:true },
  password: {type: String, required: true }
});

export interface User extends mongoose.Document {
 username: string;
 password: string;
}



UserSchema.methods.toJSON = function () {
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject,['_id','username']);
};