const jwt = require('jsonwebtoken')

function getToken(token) {
    return jwt.sign(token, 'secret')
}

function compareToken(token) {
    return jwt.verify(token, 'secret')
}

module.exports = {
    getToken,
    compareToken
}