const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
var http = require("http").Server(app);
app.use(cors());
app.use(express.urlencoded({ extended: true, limit: "100mb" }));
app.use(express.json());
const { APP_PORT, MONGO_URI } = require('./config')
const path = require("path");
var logger = require("morgan");
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(logger("dev"));
const { verifyClient } = require("./Modules/shorturl/middlewares/index");
const { UrlSch } = require("./Modules/shorturl/Models/UrlSchema")



// Database connection start
mongoose
  .connect(
    MONGO_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000,
    }
  )
  .then(() => {
    console.log("mongodb is connected");
  })
  .catch((err) => {
    console.log(err);
  });
// Database connection end


// Routes start
app.use("/api/v1/modules", require("./Modules"));
app.get("/:shortUrl", async (req, res) => {
  if (!req.params.shortUrl) {
    return res.status(404).json({ error: "Not Found", });
  }
  else {
    console.log("L-46 inside redirect controller");
    try {
      const originalProjection = { _id: 0, originalUrl: 1 };
      const originalUrl = await UrlSch.findOneAndUpdate({shortUrl: req.params.shortUrl},{$push:{visitAnalytics:{timestamp:Date.now()}}} , originalProjection);
      if (!originalUrl.originalUrl)
      return res.status(404).json({ error: "Not Found", });
        return res.redirect(originalUrl.originalUrl);
    } catch (err) {
      console.log("inside the createProducts Error--->", err.message);
      return res.status(404).json({ error: "Not Found", });
    }

  }
})
// Routes end



http.listen(APP_PORT, () => {
  console.log(`HTTP Server is running ${APP_PORT}`);
});

