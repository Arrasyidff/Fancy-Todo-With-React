module.exports = (err, req, res, next) => {
    console.log('masuk erorr handler')
    console.log('masuk eror', err.name)
    if (err.name === 'SequelizeUniqueConstraintError') {
        if (err.errors[0].message === 'email must be unique') {
            res.status(400).json({msg: 'email already exists'})
        } else if (err.errors[0].message === 'title must be unique') {
            res.status(400).json({msg: 'title already exists'})
        } else {
            res.status(400).json({msg: err.errors[0].message})
        }
    } else if (err.name === 'invalid account') {
        res.status(401).json({msg: 'invalid email/password'})
    } else if (err.name === 'invalid token' || err.name === 'JsonWebTokenError') {
        res.status(401).json({msg: 'Login First'})
    } else if (err.name === 'Data Not Found' || err.name === 'JsonWebTokenError') {
        res.status(404).json({msg: err.name})
    } else if (err.name === 'not authorized' || err.name === 'JsonWebTokenError') {
        res.status(404).json({msg: err.name})
    }
}