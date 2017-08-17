const express = require('express');
const router = express.Router();

router.get('/', function(){
  req.render('login');
});

router.post('/loginCheck', function(){
  console.log(req.body);
});

module.exports = router;
