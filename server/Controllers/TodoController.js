const { Todo } = require('../models')

class TodoController {
    static getTodos (req, res, next) {
        Todo.findAll({where: {UserId: req.loggedInUser.id},
            order: [['id', 'ASC']]
        })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                next(err)
            })
    }

    static getTodoById (req, res, next) {
        const id = req.params.id
        Todo.findOne({where: {id}})
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                next(err)
            })
    }

    static createTodo (req, res, next) {
        Todo.create({
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date,
            UserId: req.loggedInUser.id
        })
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                next(err)
            })
    }

    static updateTodo (req, res, next) {
        const id = req.params.id
        const todoUpdate = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }
        Todo.update(todoUpdate,
            {where: {id},
            returning: true
        })
            .then(data => {
                res.status(200).json(data[1][0])
            })
            .catch(err => {
                next(err)
            })
    }
    
    static updateStatusTodo (req, res, next) {
        const id = req.params.id
        Todo.update({status: req.body.status},
            {where: {id},
            returning: true
        })
            .then(data => {
                res.status(200).json(data[1][0])
            })
            .catch(err => {
                next(err)
            })
    }

    static deleteTodo (req, res, next) {
        const id = req.params.id
        Todo.destroy({where: {id}})
            .then(data => {
                res.status(200).json({msg: 'Todo Success Deleted'})
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = TodoController