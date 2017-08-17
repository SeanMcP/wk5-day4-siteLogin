const express = require('express');
const router = express.Router();

let users = [{username: 'sean', password: 'pw'}];

router.get('/', function(req, res){ // Works
  if(req.session.token){
    res.render('welcome', req.session.user);
  } else {
    res.redirect('login');
  }
});

router.get('/login', function(req, res){
  res.render('login');
});

router.post('/login', function(req, res){
  let user = {
    username: req.body.username,
    password: req.body.password
  }

  users.forEach(function(aUser){
    if(aUser.username == user.username && aUser.password == user.password){
      req.session.token = 'Speak friend and enter'; // Works
      req.session.user = user; // Works
      res.redirect('/');
    } else {
      res.redirect('/');
    }
  });

});

router.get('/logout', function(req, res){ // Works
  req.session.destroy(function(err){
    console.log(err);
  })
  res.redirect('/');
});

module.exports = router;
