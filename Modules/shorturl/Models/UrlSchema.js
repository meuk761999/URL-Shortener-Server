const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Refers to the 'User' model
            required: true
          },
        originalUrl:{type:String ,required:true},
        shortUrl:{type:String ,required:true},
        visitAnalytics:[{
            timestamp: { type: Date }
          }]
        
    },
    { timestamps: true }
);

const UrlSch = mongoose.model("url", urlSchema);
module.exports = {UrlSch};
