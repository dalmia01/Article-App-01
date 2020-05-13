const express = require('express');

const router = express.Router();

// BRing Article Model in
const Articles = require('../models/article');



// Add Article - Get Router
router.get('/add',ensureAuthentication,(req,res)=>{
  if(res.locals.user){
    res.render('add_article');
  }else{
    res.redirect('/user/login');
  }
});

// Get All Articles - Get Route
router.get('/',ensureAuthentication,(req,res)=>{

  if(res.locals.user){
    Articles.find({},(err,articles)=>{
      if(err){
        console.log('Error Occured- While getting All articles');
      }else{
        res.render('all_articles',{
          articles:articles
        });
      }
    });
  }else{
    res.redirect('/user/login');
  }

});

// Edit Article - Get Route
router.get('/edit/:id',ensureAuthentication,(req,res)=>{
  Articles.findById(req.params.id,(err,article)=>{
    if(err){
      console.log('Error - On GEt Edit Rote');
    }else{
      res.render('edit_article',{article:article});
    }
  });
});

// Particular Article - Get Route
router.get('/:id',ensureAuthentication,(req,res)=>{
  if(res.locals.user){
    Articles.findById(req.params.id,(err,article)=>{
      res.render('article',{article:article});
    });
  }else{
    res.redirect('/user/login');
  }
});


// Post Article - Post Route
router.post('/add',(req,res)=>{
  let article = new Articles();
  article.title = req.body.title;
  article.author = req.body.author;
  article.content = req.body.content;

  article.save((err)=>{
    if(err){
      console.log('Error - Add Article Posting');
    }else{
      res.redirect('/article');
    }
  });
});

// Edit Article = Post Route
router.post('/edit/:id',(req,res)=>{
  let article = {};
  article.title = req.body.title;
  article.author = req.body.author;
  article.content = req.body.content;

  let query = {_id:req.params.id};

  Articles.update(query,article,(err)=>{
    if(err){
      console.log('Error Occured - Editing Article Post');
    }else {
      res.redirect('/article');
    }
  });
});

// Particular Article - Delete Route
router.delete('/:id',(req,res)=>{
  let query = {_id:req.params.id};
  console.log(query)
  Articles.remove(query,(err)=>{
    if(err){
      console.log('Error Occured - on Deleting Article');
    }else{
      res.send('On Succesfully Deleted article');
    }
  });
});

function ensureAuthentication(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }else{
    res.redirect('/user/login');
  }
}


module.exports = router;
