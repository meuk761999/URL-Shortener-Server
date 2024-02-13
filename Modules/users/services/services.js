const mongoose = require("mongoose");
const {userSch} = require("../models/UserSchema");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {JWT_SECRET,JWT_HEADER_KEY,ENCRYPTION_CYCLE} = require("../../../config");
const { token } = require("morgan");

const createUserSer = async (req) => {
  console.log("Inside createUserSer----->L-5");
  return new Promise(async (resolve, reject) => {
    try {
      const {userEmail, userName, userPassword } = req.body;

      if (req.body) {
        let newUser = {
          userEmail: userEmail,
          userName: userName,
          userPassword: userPassword,
        };
        bcrypt.genSalt(Number(ENCRYPTION_CYCLE),(err,salt)=>bcrypt.hash(newUser.userPassword,salt,async (err,hash)=>
        {console.log(err)
          if(err)
          return reject({
            status: 500,
            message: "something went wrong",
            data: {},
          });
        newUser.userPassword=hash;
        const savedUser = await userSch.create(newUser);
        if (!savedUser) {
          return reject({
            status: 500,
            message: "something went wrong",
            data: {},
          });
        }
        if (savedUser) {
          console.log("L-26, createdUser---->");
          return resolve({
            status: 201,
            message: "Successfully User Created",
          });
        }
        }));

       
      }
    } catch (error) {
      console.log(error.message);
      return reject({
        status: 500,
        message: "Something went wrong",
        data: {},
      });
    }
  });
};
const loginUserSer = async (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      bcrypt.compare(req.body.userPassword,req.query.userPassword,(err,result)=>{
        if(err){
          return reject({
            status: 500,
            message: "Password System Fail",
          }); 
        }
        else if(result)
        {
          let payLoad={
            userName:req.body.userName,
            userEmail:req.body.userEmail,
          }
          console.log("L-7",JWT_SECRET);
          jwt.sign({payLoad},JWT_SECRET,{expiresIn:'1h'},(err,jWtoken)=>{
            if(err){
              return reject({
                status: 500,
                message: "Tokenization Failed",
              }); 
            }
            else{
              return resolve({
                status: 200,
                message: "Login Successfull",
                token: jWtoken,
                data: {
                  userName: req.body.userName,
                },
              });

            }
          })
        }
        else{
          return reject({
            status: 401,
            message: "Password does not match",
            data: {},
          });
        }
      })
    } catch (error) {
      return reject({
        status: 500,
        message: "internal server error",
        data: {},
      });
    }
  });
};
const updateUserSer = async (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("L-81, updateBlogSer", req.body);
      const { _id, heading, paragraph, createdBy, description } = req.body;
      const existPlan = await userSch.findOne({ _id: _id });
      if (!existPlan) {
        return reject({
          status: 404,
          message: "blog don't exist",
          data: {},
        });
      } else {
        const updatedObj = {
          heading: heading || existPlan.heading,
          paragraph: paragraph || existPlan.paragraph,
          createdBy: createdBy || existPlan.createdBy,
          description: description || existPlan.description,
        };
        const updatedDoubt = await userSch.findOneAndUpdate(
          { _id: _id },
          { $set: updatedObj },
          { new: true }
        );
        if (!updatedDoubt) {
          return reject({
            status: 400,
            message: "something went wrong",
            data: {},
          });
        } else {
          return resolve({
            status: 200,
            message: "successfully updated Blog",
            data: {
              updatedDoubt: updatedDoubt,
            },
          });
        }
      }

    } catch (error) {
      console.log("error : updated Doubt Blog---------------->", error.message)
      return reject({
        status: 500,
        message: "internal server error",
        data: {},
      });
    }
  });
};

const deleteUserSer = async (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { _id } = req.body;
      const deletedBlog = await userSch.findOneAndDelete({ _id: _id });
      console.log("L-136, deleted blog", deletedBlog);
      if (!deletedBlog) {
        return reject({
          status: 404,
          message: "blog don't exist",
          data: {},
        });
      } else {
        return resolve({
          status: 200,
          message: "successfully blog deleted",
          data: {
            plan: deletedBlog,
          },
        });
      }
    } catch (error) {
      console.log("error : deletedBlog---------------->", error.message)
      return reject({
        status: 500,
        message: "internal server error",
        data: {},
      });
    }
  });
};

module.exports = {
  createUserSer,
  loginUserSer,
  updateUserSer,
  deleteUserSer
};
