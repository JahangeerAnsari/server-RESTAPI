const express = require('express');
const router = express.Router();
const { getAllJobs,createJobs } = require('../controller/jobs.controller');
router.route('/').get(getAllJobs).post(createJobs);


module.exports = router;
