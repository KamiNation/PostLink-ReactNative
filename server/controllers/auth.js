// Package import
import jwt from "jsonwebtoken";
import nanoid from "nanoid";
import dotenv from "dotenv"
import nodeMailer from 'nodemailer'
dotenv.config({ path: 'info.env' })
import expressJwt from "express-jwt"
import cloudinary from "cloudinary"

// User import
import User from "../models/user.js";
import { hashPassword, comparePassword } from "../helpers/auth.js";
import { Error } from "mongoose";


// Dotenv config
const EMAIL = process.env.EMAIL
// console.log(EMAIL);
const PASS = process.env.NODE_MAILER_PASS
// console.log(PASS);
const JWT_SECRET = process.env.JWT_SECRET
// console.log("Jwt-Token",JWT_SECRET);
const CLOUD_NAME = process.env.CLOUD_NAME
// console.log("CLoudinary_name =>", CLOUD_NAME);
const CLOUD_SECRET = process.env.CLOUD_SECRET
// console.log("Cloudinary_secret =>", CLOUD_SECRET);
const CLOUD_KEY = process.env.CLOUD_KEY
// console.log("Cloudinary_key =>", CLOUD_KEY);


// Nodemailer config
const transportmail = nodeMailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL,
    pass: PASS
  }
})

// Cloudinary config
cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_KEY,
  api_secret: CLOUD_SECRET,
})


// requiredSignIn Middleware controller logic
export const requiredSignin = expressJwt({
  secret: JWT_SECRET,
  algorithms: ["HS256"]
})






 
// Controllers function logic

// signup controller logic
export const signup = async (req, res) => {
  console.log("HIT SIGNUP");
  try {
    // validation
    const { name, email, password } = req.body;
    console.log("Name =>", name);
    console.log("Email =>", email);
    console.log("Password =>", password);
    if (!name) {
      return res.json({
        error: "Name is required",
      });
    }
    if (!email) {
      return res.json({
        error: "Email is required",
      });
    }
    if (!password || password.length < 6) {
      console.log("Password =>", password);
      return res.json({
        error: "Password is required and should be 6 characters long",
      });
    }
    const exist = await User.findOne({ email });
    if (exist) {
      return res.json({
        error: "Email is taken",
      });
    }
    // hash password
    const hashedPassword = await hashPassword(password);

    try {
      const user = await new User({
        name,
        email,
        password: hashedPassword,
      }).save();

      // create signed token
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });

      //   console.log(user);
      const { password, ...rest } = user._doc;
      return res.json({
        token,
        user: rest,
      });
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
};






// sigin controller logic
export const signin = async (req, res) => {
  // console.log(req.body);
  try {
    const { email, password } = req.body;
    console.log("Email =>", email);
    console.log("Password =>", password);
    // check if our db has user with that email
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        error: "No user found",
      });
    }
    // check password
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.json({
        error: "Wrong password",
      });
    }
    // create signed token
    const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    user.password = undefined;
    user.secret = undefined;
    res.json({
      token,
      user,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error. Try again.");
  }
};






// forgot password controller logic
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  // find user by email
  const user = await User.findOne({ email });
  console.log("USER ===> ", user);
  if (!user) {
    return res.json({ error: "User not found" });
  }
  // generate code
  const resetCode = nanoid(5).toUpperCase();
  // save to db
  user.resetCode = resetCode;
  user.save();

  // prepare email
  const mailContent = {
    from: EMAIL,
    to: user.email,
    subject: "Password reset code",
    html: `<h1>Your password  reset code is: ${resetCode}</h1>`
  };
  // send email using nodemailer
  transportmail.sendMail(mailContent, (error, info) => {
    try {
      if (error) {
        console.log(error);
        return res.json({ ok: false })
      } else {
        console.log(info.messageId, "user received reset password");
        return res.json({ ok: true })
      }
    } catch (error) {
      console.log(error, "Error message");
    }
  })

};





// reset password controller logic
export const resetPassword = async (req, res) => {
  try {
    const { email, password, resetCode } = req.body;
    // find user based on email and resetCode
    const user = await User.findOne({ email, resetCode });
    // if user not found
    if (!user) {
      return res.json({ error: "Email or reset code is invalid" });
    }
    // if password is short
    if (!password || password.length < 6) {
      return res.json({
        error: "Password is required and should be 6 characters long",
      });
    }
    // hash password
    const hashedPassword = await hashPassword(password);
    user.password = hashedPassword;
    user.resetCode = "";
    user.save();
    return res.json({ ok: true });
  } catch (err) {
    console.log(err);
  }
};







// UploadImage controller logic
export const uploadImage = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req, body.image, {
      public_id: nanoid(),
      resource_type: "jpg"
    })

    const user = await User.findByIdAndUpdate(req.user._id, {
      image: {
        public_id: result.public_id,
        url: result.secure_url
      },
    },
      { new: true }
    );
    // Send response to client side
    return res.json(
      {
        name: user.name,
        email: user.email,
        role: user.role,
        image: user.image
      }
    )
  } catch (error) {
    console.log(err);
  }
}







// Update password controller logic
export const updatePassword = async (req, res) => {
  try {
    const { password } = req.body
    if (password && password.length < 6) {
      return res.json({
        error: "Password is required and should be min 6 characters long"
      });
    } else {
      // Update the db and firstly hash the password
      const hashedPassword = await hashPassword(password);
      // When you want to save the password to the db, save the
      // hashed password instead
      const user = await User.findByIdAndUpdate(req.user._id, { password: hashedPassword })
      // Send response to the client but dont send the password and secret
      user.password = undefined;
      user.secret = undefined;
      return res.json(user);
    }
  } catch (error) {
    console.log(error);
  }
}