const express = require('express');
const validator = require('validator');
const User = require('./../models/user');
const { Series, Episode, Genre, Person } = require('./../models/movie');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const Cookies = require('universal-cookie');

const router = express.Router();

router.get('/movie/home', (req, res) => {
    
})

module.exports = router;
