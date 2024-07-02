
import express from "express";
import {
  signup,
  signin,
  forgotPassword,
  resetPassword,
  uploadImage,
  requiredSignin,
  updatePassword
} from "../controllers/auth.js"


const router = express.Router();



router.get("/", (req, res) => {
  return res.json({
    data: "hello world from kamiTech auth API",
  });
});
router.post("/signup", signup);
router.post("/signin", signin);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/upload-image", requiredSignin, uploadImage)
router.post("/update-password", requiredSignin, updatePassword)

export default router;
