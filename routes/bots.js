const express = require('express');
const router = express.Router();
const { botResponse } = require('../controllers/bots.controllers')

/* GET users listing. */
router.get('/', botResponse);

module.exports = router;
