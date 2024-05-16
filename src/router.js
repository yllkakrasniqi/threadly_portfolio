const express = require("express");
const { getObject, uploadFiles } = require('./controllers');
const { uploadMiddleware } = require("./middleware/uploadMiddleware");

const router = express.Router();

router.get("/image/:objectName", getObject);
router.post("/image", uploadMiddleware, uploadFiles)

module.exports = router;