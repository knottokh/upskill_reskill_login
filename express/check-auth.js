const jwt = require('jsonwebtoken');
const jwt_key= 'XYZLQ3M0RKe6Bz6tYtU';

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        console.log(token);
        const decoded = jwt.verify(token, jwt_key);
        req.userData = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
};