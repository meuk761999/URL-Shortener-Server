const dotenv =require( 'dotenv');
dotenv.config();
module.exports = {
    APP_PORT: process.env.APP_PORT,
    JWT_HEADER_KEY:process.env.JWT_HEADER_KEY,
    JWT_SECRET:process.env.JWT_SECRET,
    MONGO_URI:process.env.MONGO_URI,
    ENCRYPTION_CYCLE:process.env.ENCRYPTION_CYCLE
  };