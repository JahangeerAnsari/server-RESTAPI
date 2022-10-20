const getAllJobs = async (req,res) =>{
    res.send("all jobs fetched")
}
const createJobs = async (req,res) =>{
  res.json(req.user)
}

module.exports = {
  getAllJobs,
  createJobs
};