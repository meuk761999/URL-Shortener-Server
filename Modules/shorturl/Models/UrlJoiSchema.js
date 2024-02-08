const Joi = require('joi');

const urlCreateJoiSchema = Joi.object({
  userId:Joi.object(),
  originalUrl:Joi.string().uri(),
  shortUrl:Joi.string(),
  vistAnalytics:Joi.array()
});
const urlReadJoiSchema = Joi.object({
  shortUrl:Joi.string(),
});
module.exports={urlCreateJoiSchema ,urlReadJoiSchema};
