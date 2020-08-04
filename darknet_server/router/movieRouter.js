const express = require('express');
const validator = require('validator');
const User = require('./../models/user');
const { Series, Episode, Genre, Person, SeriesID } = require('./../models/movie');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const cors = require('cors');
const Path = require('path')
const bcrypt = require('bcryptjs');
const Cookies = require('universal-cookie');
const fs = require('fs');

const router = express.Router();

router.get('/movie/get-all/', async (req, res) => {
    let all = await SeriesID.find({}, {}, (err, docs) => {
        if (err) {
            console.log('some error in getting all series id');
        } else {
            console.log('finish getting all series id');
        }
    });
    // console.log(all);
    all = all.map((el) => {
        return el.id;
    })
    return res.send(all);
})

router.get('/movie/watch/:vid/', async (req, res) => {
    const path = Path.join(__dirname, '..', 'public', 'movie', req.params.vid, '1.mp4');
    const stat = fs.statSync(path)
    const fileSize = stat.size
    const range = req.headers.range
    if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1]
            ? parseInt(parts[1], 10)
            : fileSize - 1
        const chunksize = (end - start) + 1
        const file = fs.createReadStream(path, { start, end })
        const head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': 'video/mp4',
        }
        res.writeHead(206, head);
        file.pipe(res);
    } else {
        const head = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4',
        }
        res.writeHead(200, head)
        fs.createReadStream(path).pipe(res)
    }
})

module.exports = router;
