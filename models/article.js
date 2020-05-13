const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
  title:{
    type:String,
    required:true
  },
  author:{
    type:String,
    required:true
  },
  content:{
    type:String,
    required:true
  }
});

let articles = module.exports = mongoose.model('Articles',articleSchema);