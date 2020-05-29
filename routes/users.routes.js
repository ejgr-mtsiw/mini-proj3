var express = require('express');
var router = express.Router();

const userController = require('../controllers/users/users.controller');

/* GET users listing. */
router.get('/', userController.getAllUsers);

module.exports = router;
