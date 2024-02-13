const mongoose = require("mongoose");
const {UrlSch} = require("../Models/UrlSchema");
const {urlCreateJoiSchema ,urlReadJoiSchema} = require("../Models/UrlJoiSchema")
var base62 = require("base62/lib/ascii");
const{ ValidationError } =require("joi");
const createURLSer = async (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("L-7, createURL Service--------------->", req.body);
      const {userId, originalUrl} = req.body;
      let  shortUrl=base62.encode(Math.floor(Math.random() * 1000001));
      let shortURLExist= await  UrlSch.findOne({$and:[{shortUrl:shortUrl},{userId:userId}]});
      console.log(shortURLExist)
       while ("L-15",shortURLExist){
        shortUrl=base62.encode(Math.floor(Math.random() * 1000001));
        shortURLExist= await  UrlSch.findOne({shortUrl:shortUrl});
       }
      console.log("L-12",typeof userId)
      if (req.body) {
        let newURL = {
         userId:userId, 
         originalUrl:originalUrl,
         shortUrl:shortUrl,
         vistAnalytics:[]
        };
        try {
           const result= await urlCreateJoiSchema.validateAsync(newURL);
          //  console.log("L-20 result",result)
        } catch (err) {
            if(err instanceof ValidationError)
            return reject({
              status:400,
              message: err.message,
            });
        }
        const urlExist= await  UrlSch.findOne({$and:[{originalUrl:newURL.originalUrl},{userId:newURL.userId}]});
        if(urlExist)
        return reject({
          status: 409,
          message: "Already Exist",
          data:{data:{shortUrl:urlExist.shortUrl}}
        });

        const savedUrl = await UrlSch.create(newURL);
        if (!savedUrl) {
          return reject({
            status: 500,
            message: "something went wrong",
          });
        }
        if (savedUrl) {
          console.log("L-26, createdProduct---->");
          return resolve({
            status: 201,
            message: "Short URL Created Successfully",
            data: {shortUrl:savedUrl.shortUrl},
          });
        }
      }
    } catch (error) {
      console.log(error.message);
      return reject({
        status: 500,
        message: "Something went wrong",
      
      });
    }
  });
};
const availableURLSer = async (req) => {
  console.log("AvailableService")
  return new Promise(async (resolve, reject) => {
    try {if(req.body.userId)
      {console.log("L-48, available Products-------->");
      const urlProjection = { _id: 1,originalUrl:1,shortUrl:1 };
      const pageNumber = req.query.pageNumber || 1; // Current page, default to 1 if not provided
      const perPage = req.query.perPage||5; // Number of documents to display per page
      const totalDocs = await UrlSch.countDocuments({userId:req.body.userId}); // Get the total number of documents
      console.log("L-51, totalDocs----->", totalDocs);
      const totalPages = Math.ceil(totalDocs / perPage);
      const availableURLs = await UrlSch.find({userId:req.body.userId},urlProjection)
        // .select({ planName: 1, planPrice: 1, askDoubtPurchasedNumber: 1, askDoubtPurchasedValidity: 1, _id: 1 })
        // .sort({ _id: -1 })
        .skip((pageNumber - 1) * perPage) // Skip documents on previous pages
        .limit(perPage); // Limit the number of documents per page
      return resolve({
        status: 200,
        count: availableURLs.length,
        message: "successfully fetched available URLs",
        totalDocuments: totalDocs,
        totalPages: totalPages,
        data: {
          availableURLs: availableURLs,
        },
      });}
    } catch (error) {
      return reject({
        status: 500,
        message: "internal server error",
        data: {},
      });
    }
  });
};
const updateURLSer = async (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("L-81, updateURLSer", req.body);
      const { _id, heading, paragraph, createdBy, description } = req.body;
      const existPlan = await UrlSch.findOne({ _id: _id });
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
        const updatedDoubt = await UrlSch.findOneAndUpdate(
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

const deleteURLSer = async (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      const {userId, urlId} = req.body;
      const deletedUrl = await UrlSch.findOneAndDelete({ _id:urlId,userId:userId});
      if (!deletedUrl) {
        return reject({
          status: 404,
          message: "URL don't exist",
          data: {},
        });
      } else {
        return resolve({
          status: 200,
          message: "URL deleted Successfully",
          data: {
            plan: deletedUrl,
          },
        });
      }
    } catch (error) {
      return reject({
        status: 500,
        message: "internal server error",
        data: {},
      });
    }
  });
};

module.exports = {
  createURLSer,
  availableURLSer,
  updateURLSer,
  deleteURLSer
};
