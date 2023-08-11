const jwt = require('jsonwebtoken');

const generateRefreshToken = (id) => {
    return jwt.sign(
        {id},
        process.env.JWT_CLIENT_SECRET,
        {
            expiresIn:'3d'
        }
        );
}


module.exports = generateRefreshToken;