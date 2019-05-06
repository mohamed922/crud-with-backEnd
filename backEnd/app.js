const express = require ('express') ;
const bodyParser = require('body-parser');
const cors = require('cors') ;
const mongoose = require('mongoose');
const Post = require('./models/post') ;
const objectId = require('mongoose').Types.ObjectId ;



//configrations
const App= express() ;
App.use(cors()) ;
App.use(bodyParser.json());
App.listen(3000, (req,res) => {
    console.log('server running ..');
});
// connect to DB
  mongoose.connect('mongodb+srv://stack:yOUbwhbd90WWuT1p@meanstack-lt3y3.mongodb.net/test?retryWrites=true',{ useNewUrlParser: true })
  .then(()=>{
      console.log('connecting to database ') ;
  })
  .catch(()=>{
      console.log('connection failed') ;
  })
// set headers 
App.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With , Content-Type , Accept");
    res.setHeader("Access-Control-Allow-Methods","GET,POST,PUT,PATCH,DELETE,OPTIONS");
    next();
}) ;

// get data from database
App.get('/posts',(req,res)=> {
    Post.find((err,docs)=>{
        res.status(200).send(docs) ;
    })
})
// get data bt id 
App.get('/posts/:id',(req,res)=>{
    if(!objectId.isValid(req.params.id)){
     return  res.status(400).send('no post found by this id ' + req.params.id) ;
    }
Post.findById(req.params.id,(err,doc)=>{
    if(!err) {  res.status(200).send(doc);}
    else {
        return console.log(`there is an erroe occured${JSON.stringify(err, undefined ,2)}`)
    }
  
})
})
// add datato database
App.post('/posts',(req,res)=> {
    const post = new Post({
    title: req.body.title ,
    description: req.body.description
    }) ;
    post.save((err,doc)=>{
        if(!err) {  res.status(200).send(doc);}
        else {
            return console.log(`there is an erroe occured${JSON.stringify(err, undefined ,2)}`)
        }
    });
     
    });
    // update post 
    App.put('/posts/:id',(req,res)=>{
        if(!objectId.isValid(req.params.id)){
          return   res.status(400).send('no post found by this id ' + req.params.id) ;
          }
          let updatedPost = {
              title: req.body.title ,
              description: req.body.description
          }
          Post.findByIdAndUpdate(req.params.id ,{$set: updatedPost},{new : true},(err,doc)=>{
            if(!err) {  res.status(200).send(doc);}
            else {
                return console.log(`there is an erroe occured${JSON.stringify(err, undefined ,2)}`)
            }
          } )
    })
    // delete post 
    App.delete('/posts/:id',(req,res)=>{
        if(!objectId.isValid(req.params.id)){
            return   res.status(400).send('no post found by this id ' + req.params.id) ;
            }
            Post.findByIdAndDelete(req.params.id,(err,doc)=>{
                if(!err) {  res.status(200).send(doc);}
            else {
                return console.log(`there is an erroe occured${JSON.stringify(err, undefined ,2)}`)
            }
            })
    })