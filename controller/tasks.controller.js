 const Task = require('../models/task.model')
//  find all task
 const getAllTasks = async (req, res) => {
 try {
   const tasks = await Task.find({});
   res.status(200).json({
     tasks
   });
 } catch (error) {
  res.status(500).json({msg:error})
 }
 };
//  add new task
 const createTask =async (req, res) => {
   try {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
   } catch (error) {
    res.status(500).json({
      msg:error
    })
   }
 };
 const getTask = async (req,res) =>{
   
  try {
    const {id:taskId} = req.params;
    const task = await Task.findOne({_id:taskId});
    if(!task){
return res.status(404).json({
  msg: `No task with this id : ${taskId}`,
});
    }else{
      res.status(200).json({task})
    }
  } catch (error) {
   res.status(500).json({
     msg: error,
   }); 
  }
 }
const updateTask = async (req, res) => {
  try {
    const {id:taskId} = req.params;
     const task = await Task.findOneAndUpdate({
      _id:taskId,
      
     },req.body);
  if(!task){
    return res.status(404).json({
      msg: `we could not find any task to this is ${taskId}`,
    });
  }else{
    res.status(200).json({
      msg:'task updated successfully',
      task :req.body
    })
  }

  } catch (error) {
    res.status(500).json({
      msg: error,
    });
  }
};
const deleteTask = async (req, res) => {
  try {
    const {id:taskId} = req.params;
    const task = await Task.findOneAndDelete({_id:taskId});
    if(!task){
      res.status(404).json({
        msg: `we dont find any task related to this id :${taskId}`,
      });
    }else{
      res.status(200).json({
        msg: `this task have  deleted successfully`,
      });
    }

  } catch (error) {
     res.status(500).json({
       msg: error,
     });
  }
};

 module.exports = {
   getAllTasks,
   createTask,
   getTask,
   updateTask,
   deleteTask,
 };