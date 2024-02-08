const express = require('express');
const router = express.Router();
const {
    createUser,
    updateUser,
    deleteUser,
    loginUser
} = require("./controller/controller");
const {userRegValidator,userLoginValidator} = require('./middlewares');

console.log("--------inside the index/users routes ----> 11")

router.post("/",userRegValidator, createUser)
router.get("/", userLoginValidator,loginUser)
router.put("/", updateUser)
router.delete("/", deleteUser)


module.exports = router;