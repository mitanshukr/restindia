const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require('crypto');
const { validationResult } = require("express-validator");

const transport = require('../middleware/mailer-sendgrid');
const User = require("../models/user");
const About = require("../models/about");

exports.postLogin = (req, res, next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    const error = new Error("Input Validation Failed!");
    error.status = 422;
    error.data = errors.array();
    throw error;
  }
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser = null;

  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        const error = new Error("A user with this email could not be found!");
        error.status = 401;
        throw error;
      }
      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then((isPwdValid) => {
      if (!isPwdValid) {
        const error = new Error("The password is not valid!");
        error.status = 401;
        throw error;
      }
      if(!loadedUser.isEmailVerified){
        const error = new Error("Login Denied! Please verify your Email.");
        error.status = 401;
        throw error;
      }
      if(!loadedUser.isApproved){
        const error = new Error("Login Denied! Account is not approved.");
        error.status = 401;
        throw error;
      }
      const token = jwt.sign(
        {
          email: loadedUser.email,
          userId: loadedUser._id.toString(),
          message: "Do not share the Token with anyone. Token is valid for an hour."
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      res
        .status(200)
        .json({
          token: token,
          userId: loadedUser._id.toString(),
          email: loadedUser.email,
        });
    })
    .catch((err) => {
      if (!err.status) {
        err.status = 500;
      }
      next(err);
    });
};

exports.postSignup = (req, res, next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    const error = new Error("Input Validation Failed!");
    error.status = 422;
    error.data = errors.array();
    throw error;
  }
  const body = req.body;
  const password = req.body.password;
  const userPayload = {};
  bcrypt
    .hash(password, 12)
    .then((hashedPwd) => {
      const user = new User({
        email: body.email,
        password: hashedPwd,
        name: body.name,
        occupation: body.occupation,
        signupReason: body.signupReason,
        isEmailVerified: false,
        isApproved: false,
      });
      return user.save();
    }).then(user => {
        const buffer = crypto.randomBytes(32);
        const token = buffer.toString('hex');
        user.verificationToken = token;
      return user.save();
  })
    .then(user => {
      userPayload._id = user._id.toString();
      userPayload.email = user.email;
      userPayload.password = user.password;
      userPayload.name = user.name;
      userPayload.occupation = user.occupation;
      userPayload.signupReason = user.signupReason;
      userPayload.isEmailVerified = user.isEmailVerified;
      userPayload.isApproved = user.isApproved;
     
      return transport.sendMail({
        to: user.email,
        from: process.env.SENDGRID_EMAIL,
        subject: 'Sign up Successful!',
        html: `<h3>Welcome ${user.name} to <strong>RestIndia REST API</strong> Insider Team.</h3>
                <p>Please click on the <a href="${process.env.ROOT_URL}/admin/verify-email/${user._id.toString()}/${user.verificationToken}">link</a> to verify your email.</p>
                <p>Your Account will be forwarded for approval after successful email verification. It may take 1 or 2 days to get your account approved.</p> 
                <small>Confidential. Please do not share.</small>`,
      });
    })
    .then((response) => {
      res.status(201).json({
        message: "Signup Successful! Verification Pending.",
        verification: `Please verify your Email. Verification link sent to your mail: [${response.message}]`,
        data: userPayload,
      });
    })
    .catch((err) => {
      if (!err.status) {
        err.status = 500;
      }
      next(err);
    });
};

exports.verifyEmail = (req, res, next) => {       //Verify User email and send for approval.
  const userId = req.params.userId;
  const verificationToken = req.params.verificationToken;

  User.findOne({ _id: userId, verificationToken: verificationToken})
  .then(user => {
    if(!user){
      const error = new Error("Invalid URL.");
      error.status = 400;
      throw error;
    }
    user.isEmailVerified = true;
    user.verificationToken = null;
    const buffer = crypto.randomBytes(32);
    const token = buffer.toString('hex');
    user.approvalToken = token;
    return user.save();
  })
  .then(user => {
    return transport.sendMail({
      to: process.env.SENDGRID_EMAIL,
      from: process.env.SENDGRID_EMAIL,
      subject: 'RestIndia API Approval Request',
      html: `<h3>Greetings from <strong>RestIndia REST API</strong> Insider Team.</h3>
              <hr>
              <p><strong>User Name</strong>: ${user.name}</p>
              <p><strong>User Email</strong>: ${user.email}</p>
              <p><strong>User Occupation</strong>: ${user.occupation}</p>
              <p><strong>Reason for Signup</strong>: ${user.signupReason}</p>
              <hr>
              <p>Please click on the <a href="${process.env.ROOT_URL}/admin/approve-user/${user._id.toString()}/${user.approvalToken}">link</a> to approve the user.</p>
              <p>Please note, after approval, an user can modify or edit API data. Approve only if you find the signupReason genuine.</p>
              <small>Confidential. Please do not share.</small>`,
    });
  })
  .then(response => {
    res.status(200).json({
      status: 200,
      message: "Email Verification Success!",
      adminMessage: `Your Account is forwarded for approval [${response.message}]. You'll get a mail once approved!`
    })
  })
  .catch((err) => {
    if (!err.status) {
      err.status = 500;
    }
    next(err);
  });
}

exports.approveUser = (req, res, next) => {
  const userId = req.params.userId;
  const approvalToken = req.params.approvalToken;
  let userObj = {};
  let mailSentStatus = null;

  User.findOne({ _id: userId, approvalToken: approvalToken})
  .then(user => {
    if(!user){
      const error = new Error("Invalid URL.");
      error.status = 400;
      throw error;
    }
    user.isApproved = true;
    user.approvalToken = null;
    userObj = {
      name: user.name,
      email: user.email,
    }
    return user.save();
  })
  .then(user => {
    return transport.sendMail({
      to: user.email,
      from: process.env.SENDGRID_EMAIL,
      subject: 'RestIndia API Account Approved!',
      html: `<h3>Greetings from <strong>RestIndia REST API</strong> Insider Team.</h3>
              <p>Congratulations! Your account is approved now.</p>
              <hr>
              <p><strong>User Name</strong>: ${user.name}</p>
              <p><strong>User Email</strong>: ${user.email}</p>
              <hr>
              <p>You can now modify or edit the API data. Please be careful while editing or modifying the API data. See you inside!</p>
              <p>You can find your name in our contributors list at <a href="${process.env.ROOT_URL}/about">/about</a> endpoint.</p>
              <small>Confidential. Please do not share.</small>`,
    });
  }).then(response => {
    mailSentStatus = response.message;
    return About.findOne({name: "RestIndia REST API"});
  })
  .then(about => {
      about.contributors.push(userObj);
      return about.save();
  })
  .then(response => {
    res.status(200).json({
      status: 200,
      message: "Account Approval Success!",
      adminMessage: `Confirmation sent to User: [${mailSentStatus}].`
    })
  })
  .catch((err) => {
    if (!err.status) {
      err.status = 500;
    }
    next(err);
  });
}

exports.resetPasswordInit = (req, res, next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    const error = new Error("Input Validation Failed!");
    error.status = 422;
    error.data = errors.array();
    throw error;
  }
  const email = req.body.email;

  User.findOne({ email: email })
  .then(user => {
    if(!user){
      const error = new Error("A user with this email could not be found!");
      error.status = 400;
      throw error;
    }
    const buffer = crypto.randomBytes(32);
    const token = buffer.toString('hex');
    user.resetToken = token;
    user.resetTokenExpiry = Date.now() + (3600 * 1000); //1hr validation
    return user.save();
  })
  .then(user => {
    return transport.sendMail({
      to: user.email,
      from: process.env.SENDGRID_EMAIL,
      subject: 'RestIndia Password Reset Request',
      html: `<h3>Password Reset URL!</h3>
            <p>Please note, this is an unique URL for your password reset, which can be used only once.</p>
            <p>Make sure to send a <strong>POST</strong> request to this <a href="${process.env.ROOT_URL}/admin/reset-password/${user._id.toString()}/${user.resetToken}">URL</a> to reset your password.</p>
            <p><strong>Expected Payload:</strong>&nbsp;<code>{</br>
            </t>"email": "${user.email}",</br>
            </t>"newPassword": "{new-password}"</br>
            }</code>
            </p>
            <p><strong>method:</strong> "POST"</p>
            <p><strong>Content-Type:</strong> "application/json"</p>
            <hr>
            <p>The link is valid for an hour.</p>
            <small>Ignore this mail, if you did not request Password Reset.</small>
            <small>Confidential. Please do not share.</small>`,     
    });
  })
  .then(response => {
    res.status(200).json({
      status: 200,
      message: `Password Reset URL is sent to your mail: [${response.message}]. Please follow the instructions.`,
    })
  })
  .catch((err) => {
    if (!err.status) {
      err.status = 500;
    }
    next(err);
  });
}

exports.resetPassword = (req, res, next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    const error = new Error("Input Validation Failed!");
    error.status = 422;
    error.data = errors.array();
    throw error;
  }
  const email = req.body.email;
  const newPassword = req.body.newPassword;
  const userId = req.params.userId;
  const resetToken = req.params.resetToken;
  let newHashedPwd = null;

  bcrypt
    .hash(newPassword, 12)
    .then((hashedPwd) => {
      newHashedPwd = hashedPwd;
      return User.findOne({ email: email, _id: userId, resetToken: resetToken, resetTokenExpiry: {$gt: Date.now()} })
    .then(user => {
      if(!user){
        const error = new Error("Looks Like the URL/Payload is Invalid or Expired.");
        error.status = 400;
        throw error;
      }
      user.password = newHashedPwd;
      user.resetToken = null;
      user.resetTokenExpiry = null;
      return user.save();
    }).then(response => {
        res.status(200).json({
          status: 200,
          message: "Password updated Successfully!",
          email: email,
        });
    })
  }).catch((err) => {
    if (!err.status) {
      err.status = 500;
    }
    next(err);
  });
}
