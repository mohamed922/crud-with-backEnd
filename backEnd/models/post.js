const mongoose = require('mongoose') ;
const postSchema = mongoose.Schema(
    { title:{type:String },
      description : {type:String },
    }
    ) ;
    module.exports = mongoose.model('Post' , postSchema)