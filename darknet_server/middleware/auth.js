const jwt = require('jsonwebtoken');

const auth = async function (req, res, next) {
    if (req.header('Authorization')== null) {
        return res.status(200).send('not authorized');
    }
    const token = req.header('Authorization');
    try {
        // const token = req.header('Authorization').replace('Bearer ', '');
        let data = jwt.verify(token, 'darknet');
        req.email = data.email;
        next();
    } catch (e) {
        console.log(e);
        return res.status(200).send('invalid token');
    }
}

module.exports = auth;
