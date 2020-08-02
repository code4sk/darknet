const express = require('express');
const path = require('path');
const userRouter = require('./router/userRouter'); 
require('./mongoose/mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
// app.use(cors);
app.use(cookieParser());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", true);
    next();
});

app.use(express.static(path.join(__dirname, 'public')));


app.use(userRouter);

app.listen(8000, () => {
    console.log('Server started!');
})
