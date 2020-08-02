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

router.get('/user/data', (req, res) => {
    return res.status(200).send('hi i am node');
})


router.post('/user/check-token', (req, res) => {
    try {
        const token = req.body.token;
        const data = jwt.verify(token, 'darknet');
        return res.status(200).send(data);
    } catch (e) {
        return res.status(200).send({ status: "Invalid token", e });
    }
})

router.post('/user/login', cors(), async (req, res) => {
    console.log(req.body);
    let email = req.body.email;
    const cookies = new Cookies();
    // console.log(cookies.get('name'));
    let password = req.body.password;
    try {
        const users = await User.find({ email });
        check = false;
        user = null
        for (let i = 0; i < users.length; i++){
    if (await bcrypt.compare(password, users[i].password)) {
            user = users[i];
            check = true;
            break;
        }
        }
        if (!check) {
            return res.status(200).send('authentication failed');
        }
        const token = await jwt.sign(user.toObject(), 'darknet');
        console.log('done');
        return res.status(200).send({
            user,
            token
        });
    } catch (e) {
        console.log(e)
        return res.status(200).send('error')
    }
})

router.post('/user/sign-up', async (req, res) => {
    console.log(req.body);
    let email = req.body.email;
    let password = req.body.password;
    console.log(validator.isEmail(email));
    if (!validator.isEmail(email)) {
        return res.status(200).send('email not valid');
    }
    const rec = await User.findOne({ email });
    if (rec) {
        return res.status(200).send('Email id already exists');
    }
    const user = new User({
        'email': email,
        'password': password
    });
    try {
        await user.save(); 
        const token = await jwt.sign(user.toObject(), 'darknet');
        return res.status(200).send({
            user,
            token
        });
    } catch (e) {
        console.log(e)
        return res.status(200).send({
           'error': e
       })
    }
})

module.exports = router;
