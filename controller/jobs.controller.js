const { response } = require('express');
const { check } = require('express-validator');
const { StatusCodes } = require('http-status-codes');
const Job = require('../models/job.model');
// new job created for
const createJobs = async (req, res) => {
  try {
    const checkPosition = await Job.findOne({ positon: req.body.positon });
    console.log('checkPosition', checkPosition);
    if (checkPosition) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        msg: 'This Postition is already Present with us.. try another',
      });
    } else {
      req.body.createdBy = req.user.userId;
      const job = await Job.create(req.body);
      res.status(StatusCodes.CREATED).json({
        msg: ' new job created....',
        data: job,
      });
    }
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: error.message,
    });
  }
};
const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ createdBy: req.user.userId }).sort(
      'createdBy'
    );

    res.status(StatusCodes.OK).json({
      msg: 'Fetched jobs...',
      data: jobs,
      count: jobs.length,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: error.message,
    });
  }
};
const getJob = async (req, res) => {
  try {
    const {
      user: { userId },
      params: { id: jobId },
    } = req;
    const job = await Job.findOne({
      _id: jobId,
      createdBy: userId,
    });
    if (!job) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        msg: `no such job found for this ${userId}`,
      });
    }

    res.status(StatusCodes.OK).json({
      msg: 'jobs',
      job,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: error.message,
    });
  }
};
const updateJob = async (req, res) => {
  try {
    const {
      body: { company, positon },
      user: { userId },
      params: { id: jobId },
    } = req;
    const job  = await Job.findByIdAndUpdate({_id:jobId,createdBy:userId},req.body,{new:true,runValidators:true})
    if (!job) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        msg: `no such job found for this ${userId}`,
      });
    }

    res.status(StatusCodes.OK).json({
      msg: 'Job updated successfully ',
      job,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: error.message,
    });
  }
};
const deleteJob = async (req,res) => {
  try {
    const {
     
      user: { userId },
      params: { id: jobId },
    } = req;
    const job = await Job.findByIdAndRemove({_id:jobId,createdBy:userId});
    if(!job){
      return res.status(StatusCodes.BAD_REQUEST).json({
        msg: `there is no such job present with this job id ${jobId}`,
      });
    }
    res.status(StatusCodes.OK).json({
      msg:'Jod delete sucessfully',
      job
    })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: error.message,
    });
  }
};
module.exports = {
  getAllJobs,
  createJobs,
  getJob,
  updateJob,
  deleteJob,
};
