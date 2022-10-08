const express = require('express');
const router = express.Router();
const{getAllTasks,createTask,deleteTask,getTask,updateTask} = require('../controller/tasks.controller');
const {isRequestValidated,validateRequest} = require('../validators/index')

router
  .route('/')
  .get(getAllTasks)
  .post(validateRequest, isRequestValidated,createTask);
// for single task option we can update get ,delete by id
router.route('/:id').get(getTask).patch(validateRequest, isRequestValidated, updateTask).delete(deleteTask);
module.exports = router;