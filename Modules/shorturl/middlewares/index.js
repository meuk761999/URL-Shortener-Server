const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require("../../../config");
const {userSch} = require( "../../users/models/UserSchema");
const verifyClient = async (req, res, next) => {
    try {
      // req.checkHeaders("eh-auth-token", "No Token Found").exists();
      const headerToken = req.headers["eh-auth-token"];
      console.log("L-7, authorization------->", headerToken)
      if (!headerToken) {
        return res.status(401).json({
          status: 401,
          message: "No header token attached",
          data: {}
        });
      }
      try {
        let decoded = await jwt.verify(headerToken, JWT_SECRET);
        if (!decoded) {
          return res.status(401).json({
            status: 401,
            message: "Token verification failed",
            data: {}
          });
        }
        console.log('l-24 Decoded',decoded)
        console.log(decoded.payLoad.userEmail);
        const projection = { _id: 1 };
        let userId = await userSch.findOne({ userEmail: decoded.payLoad.userEmail}, projection);
        req.body.userId=userId._id;
        if(!userId) {
          return res.status(500).json({
            staus: 400,
            message: "user fail",
            data: {}
          });
        }
        next();
      } catch (e) {
        if (e instanceof jwt.JsonWebTokenError) {
          return res.status(401).json({
            status: 401,
            message: "Token decryption failed",
            data: {}
          });
        }
      }
    } catch (err) {
      console.log("L-38, verfiyadminerr---->", err.message);
      return res.status(500).json({
        staus: 500,
        message: "Something went wrong",
        data: {}
      });
    }
  };

module.exports={verifyClient};