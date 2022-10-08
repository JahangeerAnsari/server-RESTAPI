const getAllProducts = async (req,res) =>{
    //  throw new Error('testing error')
  res.status(200).json({msg:"prodcts routes"})
}
module.exports = {
  getAllProducts,
};