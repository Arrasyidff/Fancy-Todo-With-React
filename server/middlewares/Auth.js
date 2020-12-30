const { User, Todo } = require('../models')
const { compareToken } = require('../helper/generateToken')

class OAuth {
    static Authenticate (req, res, next) {
        const { access_token } = req.headers

        if (!access_token) {
            next({name: 'invalid token'})
        } else {
            const decoded = compareToken(req.headers.access_token)
            req.loggedInUser = decoded
            
            User.findOne({where: {id: decoded.id}})
                .then(data => {
                    if (!data) {
                        next({name: 'invalid token'})
                    } else {
                        next()
                    }
                })
                .catch(err => {
                    next(err)
                })
        }
    }

    static Authorization (req, res, next) {
        const id = req.params.id
        Todo.findOne({where: {id}})
            .then(data => {
                if (data) {
                    if (data.UserId === req.loggedInUser.id) {
                        next()
                    } else {
                        next({name: 'not authorized'})
                    }
                } else {
                    next({name: 'Data Not Found'})
                }
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = OAuth