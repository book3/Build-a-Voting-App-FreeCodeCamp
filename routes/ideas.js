const express=require('express');
const router= express.Router();
const mongoose=require('mongoose');
const {ensureAuthenticated} = require('../helpers/auth');

//Load Idea mondel db
require('../models/Idea');
const Idea = mongoose.model('ideas');

    router.get('/',(req,res)=>{
      Idea.find({})
      .then(poll=>{
        res.render('ideas/index',{poll:poll});
      });
    });


    router.get('/show/:id',(req,res)=>{
      Idea.findOne({
        _id: req.params.id
      })
      .then(poll=>{
        res.render('ideas/single',{poll:poll});
      });
    });

    router.get('/my',ensureAuthenticated,(req,res)=>{
      Idea.find({user:req.user.id})
        .then(poll=>{
          res.render("ideas/index",{poll: poll});
        });
    });

    router.post('/add/option',ensureAuthenticated,(req,res)=>{
      var a = Number(req.body.value)+1;
      res.render("ideas/add",{amount:a});
    });

    router.get('/add',ensureAuthenticated,(req,res)=>{
      res.render("ideas/add",{amount:2});
    });


    //posts new polls
    router.post('/',ensureAuthenticated,(req,res)=>{

            const newIdea = {
              title: req.body.title,
              options: [{
                optionBody:req.body.options[0],
              }],
              user: req.user.id
            }
            // Create Story
            new Idea(newIdea)
              .save()
              .then(story => {
                for(var i=1;i<req.body.value;i++){
                  const option = {
                    optionBody:req.body.options[i],
                  };
                  story.options.unshift(option);
                  story.save()
                }

                res.redirect(`/ideas/show/${story.id}`);
              });
    });


    //voting
    router.put('/vote/:id',(req,res)=>{

      console.log(req.body.option);

      Idea.update( {_id : req.body.id , "options.optionBody" : req.body.option } ,
                {$inc : {"options.$.optionScore" : 1} }
                )
                .then(()=>{
                  res.redirect(`/ideas/show/${req.body.id}`);
                });
    });




    //delate idea
    router.delete('/:id',ensureAuthenticated,(req,res)=>{
      Idea.remove({_id: req.params.id})
        .then(()=>{
          req.flash('success_msg',"Video Idea Revoved");
          res.redirect('/ideas');
        });
    });

    //Show one idea

module.exports = router;
