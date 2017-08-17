const express = require('express');
const router = express.Router();

let users = [{username: 'mcpherson', password: 'mcpherson'}];

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

  // Begin validation check
  req.checkBody('username', 'Your username cannot be empty').notEmpty();
  req.checkBody('username', 'Usernames must be 8 to 20 characters long').len(8, 20);
  req.checkBody('password', 'Your password cannot be empty').notEmpty();
  req.checkBody('password', 'Password must be 8 to 20 characters long').len(8, 20);

  let errors = req.getValidationResult();
  let messages = [];

  errors.then(function(result){
    result.array().forEach(function(error){
      messages.push(error.msg);
    });

    let errArr = {
      errors: messages
    };
    console.log('errArr:', errArr);
    // End validation check
    if(messages[0]){
      console.log('messages is true');
      res.render('login', {errArr: errArr});
    } else {
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
    }
  });
});

router.get('/logout', function(req, res){ // Works
  req.session.destroy(function(err){
    console.log('Logout error:', err);
  })
  res.redirect('/');
});

module.exports = router;
