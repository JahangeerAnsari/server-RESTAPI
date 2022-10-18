const express = require('express');
const router = express.Router();
const { getAllJobs } = require('../controller/jobs.controller');
router.route('/').get(getAllJobs)


module.exports = router;
