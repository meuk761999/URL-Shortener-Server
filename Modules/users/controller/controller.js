const {
    createUserSer,
    loginUserSer,
    updateUserSer,
    deleteUserSer
} = require("../services/services");

const createUser = async (req, res) => {
    console.log("inside the createUser --->9");
    try {
        const data = await createUserSer(req);
        return res.status(data.status).json(data);
    } catch (err) {
        console.log("inside the createUser Error--->", err.message);
        return res.status(err.status).json({ error: err.message });
    }
};
const loginUser = async (req, res) => {
    try {
        const data = await loginUserSer(req);
        return res.status(data.status).json(data);
    } catch (err) {
        console.log("inside the loginUser Error--->", err.message, err.status);
        return res.status(err.status).json({ error: err.message });
    }
};
const updateUser = async (req, res) => {
    try {
        const data = await updateUserSer(req);
        return res.status(data.status).json(data);
    } catch (err) {
        console.log("inside the updateUser Error--->", err.message);
        return res.status(err.status).json({ error: err.message });
    }
};
const deleteUser = async (req, res) => {
    try {
        const data = await deleteUserSer(req);
        return res.status(data.status).json(data);
    } catch (err) {
        console.log("inside the deleteUser Error--->", err.message);
        return res.status(err.status).json({ error: err.message });
    }
};


module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser
};
