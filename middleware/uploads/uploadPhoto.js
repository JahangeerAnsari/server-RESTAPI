const multer = require('multer');
const sharp = require('sharp');
const path = require('path')

// storage
const multerStorage = multer.memoryStorage();

// file type checking
const multerFilter = (req,file,cb) => {
  // check file type
  if(file.mimetype.startsWith("image")){
    cb(null,true)
  }else{
    // rejected files
    cb({
      message: 'Unsupported file format',
    },false);
  }

};
const uploadPhoto = multer({
  storage:multerStorage,
  fileFilter:multerFilter,
  limits:{fileSize:10 * 1024 * 1024 * 1024},
});
// user profile image resizing
const profilePhotoResize = async (req,res,next) =>{
  // check if there is no file to resize
  if(!req.file)
  
  return next();

  req.file.filename = `user-${Date.now()}-${req.file.originalname}`;
  // console.log("resizing",req.file)
  await sharp(req.file.buffer).resize(250,250).toFormat("jpeg")
  .jpeg({quality:90}).toFile(path.join(`public/images/profile/${req.file.filename}`));
  next();
}

// user POST  resizing
const postImageResize = async (req,res,next) =>{
  // check if there is no file to resize
  if(!req.file)
  
  return next();

  req.file.filename = `user-${Date.now()}-${req.file.originalname}`;
  // console.log("resizing",req.file)
  await sharp(req.file.buffer).resize(500,500).toFormat("jpeg")
  .jpeg({quality:90}).toFile(path.join(`public/images/posts/${req.file.filename}`));
  next();
}
module.exports = {uploadPhoto,profilePhotoResize,postImageResize}
