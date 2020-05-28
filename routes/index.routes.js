const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home.controller');

/* GET home page. */
router.get('/', homeController.showHomepage);

module.exports = router;
