const {
    createURLSer,
    availableURLSer,
    updateURLSer,
    deleteURLSer
} = require("../services/services");

const createURL = async (req, res) => {
    try {
        const data = await createURLSer(req);
        return res.status(data.status).json(data);
    } catch (err) {
        console.log("inside the createProducts Error--->", err.message);
        return res.status(err.status).json(err.data);
    }
};
const availableURL = async (req, res) => {
    try {
        const data = await availableURLSer(req);
        return res.status(data.status).json(data);
    } catch (err) {
        console.log("inside the availableBlog Error--->", err.message, err.status);
        return res.status(err.status).json({ error: err.message });
    }
};
const updateURL = async (req, res) => {
    try {
        const data = await updateURLSer(req);
        return res.status(data.status).json(data);
    } catch (err) {
        console.log("inside the updateBlog Error--->", err.message);
        return res.status(err.status).json({ error: err.message });
    }
};
const deleteURL = async (req, res) => {
    try {
        const data = await deleteURLSer(req);
        return res.status(data.status).json(data);
    } catch (err) {
        console.log("inside the deleteURL Error--->", err.message);
        return res.status(err.status).json({ error: err.message });
    }
};


module.exports = {
    createURL,
    availableURL,
    updateURL,
    deleteURL
};
