const express = require('express');
const router = express.Router();
const{getAllTasks,createTask,deleteTask,getTask,updateTask} = require('../controller/tasks')

router.route('/').get(getAllTasks).post(createTask);
// for single task option we can update get ,delete by id
router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask)
module.exports = router;