const express = require('express');
const router = express.Router();
const {
  getAllJobs,
  createJobs,
  getJob,
  deleteJob,
  updateJob,
} = require('../controller/jobs.controller');
// jobsValidation
const {
 jobsValidation,
  isRequestValidated
 
} = require('../validators');
router.route('/').get(getAllJobs).post(jobsValidation,
  isRequestValidated, createJobs);

  router
    .route('/:id')
    .get(getJob)
    .delete(deleteJob)
    .patch(jobsValidation, isRequestValidated,updateJob);


module.exports = router;
