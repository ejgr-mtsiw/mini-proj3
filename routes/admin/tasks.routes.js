var express = require('express');
var router = express.Router();

const taskController = require('../../controllers/tasks/tasks.controller');

module.exports = (auth) => {

    /**
     * Get all tasks
     */
    router.get('/',
        auth.required,
        taskController.getAllTasks);

    /**
     * Add a new task to the database
     */
    router.post('/',
        auth.required,
        taskController.addNewTask);

    /**
     * Updates a task
     */
    router.put('/:idTask?',
        auth.required,
        taskController.updateTask);

    /**
     * Removes a task from the database
     */
    router.delete('/:idTask',
        auth.required,
        taskController.deleteTask);

    return router;
}