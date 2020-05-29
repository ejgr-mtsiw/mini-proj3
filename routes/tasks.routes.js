var express = require('express');
var router = express.Router();

const taskController = require('../controllers/tasks/tasks.controller');

/**
 * Get all tasks
 */
router.get('/', taskController.getAllTasks);

/**
 * Add a new task to the database
 */
router.post('/', taskController.addNewTask);

/**
 * Updates a task
 */
router.put('/:idTask?', taskController.updateTask);

/**
 * Removes a task from the database
 */
router.delete('/:idTask', taskController.deleteTask);

module.exports = router;