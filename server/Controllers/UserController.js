const { User } = require('../models')
const { verifyPass } = require('../helper/hashingPass')
const { getToken } = require('../helper/generateToken')

class UserController {
    static register (req, res, next) {
        User.create({
            email: req.body.email,
            password: req.body.password    
        })
            .then(data => {
                res.status(201).json({id: data.id, email: data.email})
            })
            .catch(err => {
                next(err)
            })
    }

    static login (req, res, next) {
        User.findOne({where: {
            email: req.body.email
        }})
            .then(data => {
                if (data) {
                    const access_token = getToken({id: data.id, email: data.email})
                    if(verifyPass(req.body.password, data.password)) {
                        res.status(200).json({access_token})
                    } else {
                        next({name: 'invalid account'})
                    }
                } else {
                    next({name: 'invalid account'})
                }   
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = UserController