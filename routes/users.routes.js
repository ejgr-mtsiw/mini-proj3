var models = require('../models');
var express = require('express');
var router = express.Router();

const mysql = require('mysql2');

/* GET users listing. */
router.get('/', function (req, res, next) {

  var con = mysql.createConnection({
    "user": "webitclo_webbook",
    "password": "webbookPW#2018",
    "database": "webitclo_webbook",
    "host": "webitcloud.net"
  });

  const query = con.query('SELECT * from speaker;',
    function (err, rows, fields) {
      console.log(query.sql);
      if (err) {
        console.log(err);
        res.status(jsonMessages.db.dbError.status).send(jsonMessages.db.dbError);
      }
      else {
        if (rows.length == 0) {
          res.status(jsonMessages.db.noRecords.status).send(jsonMessages.db.noRecords);
        }
        else {
          res.send(rows);
        }
      }
    });
  /*
  
    models.User.findAll()
      .then(function (users) {
  
        console.info("List of speakers: " + users.length);
  
        console.info(users);
  
        users.forEach(element => {
          console.info(element);
        });
  
        res.render('speakers', {
          title: 'Speakers',
          speakers: users
        });
      });
      */
});

module.exports = router;
