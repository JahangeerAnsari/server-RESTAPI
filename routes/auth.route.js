const express = require("express");
const router = express.Router();
const {
  login,
  register,
  logout,
  getAllUsers,
  getSingleUser,
  deleteUser,
  UpdateUser,
  fetchedonlyUsers,
  followingController,
  unfollowController,
  blockUserController,
  unBlockUserController,
  generateVerificationTokenController,
  accountVerificationController,
  forgotPasswordTokenController,
  passwordResetController,
  profilePhotoUploadController,
} = require("../controller/auth.controller");

const {
  authenticationMiddleware,
  authorizationPermissions,
} = require("../middleware/auth");
const {
  uploadPhoto,
  profilePhotoResize,
} = require("../middleware/uploads/uploadPhoto");
const checkPermissions = require("../utils/checkPermission");
const {
  validateUser,
  isRequestValidated,
  loginValidation,
} = require("../validators");
router.post("/register", validateUser, isRequestValidated, register);
// this route is exxample of many authorization permissions
// router.get('/',authenticationMiddleware,authorizationPermissions('admin','user'), getAllUsers);
router.get(
  "/users",
  authenticationMiddleware,
  authorizationPermissions("admin", "user"),
  getAllUsers
);
// admin have ability to fetch all users
router.get(
  "/all-users",
  authenticationMiddleware,
  authorizationPermissions("admin"),
  fetchedonlyUsers
);

// router.get("/:id", authenticationMiddleware, checkPermissions, getSingleUser);
router.get("/:id", authenticationMiddleware, checkPermissions, getSingleUser);
router.delete("/:id", authenticationMiddleware, checkPermissions, deleteUser);
router.patch("/:id", authenticationMiddleware, UpdateUser);
router.put("/follow", authenticationMiddleware, followingController);
router.put("/unfollow", authenticationMiddleware, unfollowController);
router.put("/block-user/:id", authenticationMiddleware, blockUserController);
router.put(
  "/unblock-user/:id",
  authenticationMiddleware,
  unBlockUserController
);
router.post(
  "/generate-verify-email-token",
  authenticationMiddleware,
  generateVerificationTokenController
);
router.put(
  "/verify-account",
  authenticationMiddleware,
  accountVerificationController
);
router.post("/forgot-account-token", forgotPasswordTokenController);
router.put("/reset-password", passwordResetController);
router.put(
  "/profile-photo-upload",
  authenticationMiddleware,
  
  uploadPhoto.single("image"),
  profilePhotoResize,
  profilePhotoUploadController
);

router.post("/login", loginValidation, isRequestValidated, login);
router.get("/logout", logout);
module.exports = router;
