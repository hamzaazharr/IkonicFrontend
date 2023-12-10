const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    role: { type: String, default: 'user' },
    password:{type:String,required:true}
  });
  module.exports =mongoose.model("users",userSchema);