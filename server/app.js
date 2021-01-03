const express = require('express')
const app = express()
const port = 4000
const cors = require('cors')
const routes = require('./Routes')
const errorHandler = require('./middlewares/errorhandler')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

app.use('/', routes)
app.use(errorHandler)
// app.get('/', (req, res) => {
//     res.status(200).json({msg: 'Hello World'})
// })

app.listen(port, () => {
    console.log('listening on http://localhost:' + port)
})