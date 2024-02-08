const express = require('express');
const router = express.Router();
const {
    createURL,
    availableURL,
    updateURL,
    deleteURL
} = require("./controller/controller");
const {verifyClient}=require('./middlewares')

router.post("/",verifyClient, createURL)
router.get("/",verifyClient, availableURL)
router.put("/", updateURL)
router.delete("/",verifyClient, deleteURL)


module.exports = router;