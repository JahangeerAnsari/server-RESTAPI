const { StatusCodes } = require("http-status-codes");
const Category = require("../models/category.model");

const addNewCategoryController = async (req, res) => {
  try {

    const exitCategory = await Category.findOne({ title: req.body.title });
     
    if(exitCategory){
      res.status(StatusCodes.BAD_REQUEST).json({
        msg: `Already Exists category Please try different`,
      });
    }else{
      const category = await Category.create({
        user: req.user.userId,
        title: req.body.title,
      });
      
      res.status(StatusCodes.CREATED).json({
       msg:'New category created...',
       category
      })
    }
    
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: error.message,
    });
  }
};

// get all category
const getAllCategoryController = async (req, res) => {
  try {
    const categories = await  Category.find({}).populate("user").sort("-createdAt");
    if(!categories){
      return res.status(StatusCodes.BAD_REQUEST).json({
        msg:'Failed to find categories'
      })
    }
    res.status(StatusCodes.OK).json({
     msg:'Fetched categories...',
     categories
    })
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: error.message,
    });
  }
};
// get single category
const getSingleCategoryController = async (req, res) => {
  try {
    const {id:categoryId} = req.params;
    const category = await  Category.findById(categoryId);
    if(!category){
      return res.status(StatusCodes.BAD_REQUEST).json({
        msg:'Category not found',
      })
    }
    res.status(StatusCodes.OK).json({
     msg:'fetch category..',
     category
    })
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: error.message,
    });
  }
};
// update category
const updateCategoryController = async (req, res) => {
  const {id:categoryId} = req.params;
  try {
    const category = await Category.findByIdAndUpdate({_id:categoryId},{
      user: req.user.userId,
      title: req.body.title, 
    },{
      new:true,
      runValidators: true,
    });
    if(!category){
      return res.status(StatusCodes.BAD_REQUEST).json({
        msg:'Failed to update category'
      })
    }
    res.status(StatusCodes.OK).json({
      msg:'Category updated successfully',
      category
    })
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: error.message,
    });
  }

}
const deleteCategoryController = async (req, res) => {
  const {id:categoryId} = req.params;
  try {
    const category = await Category.findByIdAndDelete(categoryId);
    if(!category){
      return res.status(StatusCodes.BAD_REQUEST).json({
        msg:'Failed to delete category',
      })
    }
    res.status(StatusCodes.OK).json({
      msg: 'Category deleted successfully',
      category
    })
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: error.message,
    });
  }
}
module.exports = {
  addNewCategoryController,
  getAllCategoryController,
  getSingleCategoryController,
  updateCategoryController,
  deleteCategoryController
};
