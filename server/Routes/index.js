const router = require('express').Router()
const OAuth = require('../middlewares/Auth')
const UserController = require('../Controllers/UserController')
const TodoController = require('../Controllers/TodoController')

router.post('/register', UserController.register)
router.post('/login', UserController.login)

router.use(OAuth.Authenticate)
router.get('/todos', TodoController.getTodos)
router.post('/todos', TodoController.createTodo)

router.use('/todos/:id', OAuth.Authorization)
router.get('/todos/:id', TodoController.getTodoById)
router.put('/todos/:id', TodoController.updateTodo)
router.patch('/todos/:id', TodoController.updateStatusTodo)
router.delete('/todos/:id', TodoController.deleteTodo)

module.exports = router