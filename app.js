const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');

const app=express();

//load routes
const{
  times,
  list,
  listee
} = require('./helpers/auth')

const ideas=require('./routes/ideas');
const users=require('./routes/users');
//passport config
require('./config/passport')(passport);
//db config

const db=require('./config/database');

require('./models/Idea');
const Idea = mongoose.model('ideas');

//Map global promise - get rid of warning
mongoose.Promise = global.Promise;

mongoose.connect(db.mongoURI)
.then(()=>console.log('MongoDB connected...'))
.catch(err=>console.log(err));


//handlebars
app.engine('handlebars',exphbs({defaultLayout: 'main'}));
app.set('view engine','handlebars');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.engine('handlebars', exphbs({
  helpers:{
    times: times,
    list: list,
    listee: listee
  },
  defaultLayout:'main'
}));
//static folder
app.use(express.static(path.join(__dirname,'public')));

app.use(methodOverride('_method'));

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

//passport midevear
app.use(passport.initialize());
app.use(passport.session());


app.use(flash());

app.use(function(req,res,next){
  res.locals.success_msg= req.flash('success_msg');
  res.locals.error_msg= req.flash('error_msg');
  res.locals.error= req.flash('error');
  res.locals.user =req.user || null;
  next();
})

      app.get('/',(req,res)=>{
        var title="Welcome";
        res.render("index",{title: title});
      });


      app.get('/about',(req,res)=>{
        res.render("about");
      });

      app.get('/all',(req,res)=>{
        Idea.find({})
          .then(poll=>{
            res.render("ideas/index",{poll: poll});
          });
      });


      app.use('/ideas',ideas);
      app.use('/users',users);




const port = process.env.PORT || 5000;

app.listen(port,()=>{
  console.log(`Server started on port ${port}`);
});
