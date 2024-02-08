const Joi = require('joi');

const userRegJoiSchema = Joi.object({
  userEmail: Joi.string().email().lowercase().required().max(320),
  userName: Joi.string().alphanum().min(3).max(30).required(),
  userPassword: Joi.string().pattern(new RegExp('^([a-zA-Z0-9@*#]{8,15})$')).required(),
  reUserPassword:Joi.ref('userPassword')
});
const userLoginJoiSchema = Joi.object({
  userEmail: Joi.string().email().lowercase().required().max(320),
  userPassword: Joi.string().pattern(new RegExp('^([a-zA-Z0-9@*#]{8,15})$')).required(),
});
module.exports={userRegJoiSchema ,userLoginJoiSchema};
// Password matching expression. Match all alphanumeric character and predefined wild characters. 
// Password must consists of at least 8 characters and not more than 15 characters.
// https://regexlib.com/Search.aspx?k=password&AspxAutoDetectCookieSupport=1