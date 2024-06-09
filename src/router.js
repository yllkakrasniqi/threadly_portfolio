const express = require("express");
const { getObject, uploadFiles, removeObject } = require('./controllers');
const { uploadMiddleware } = require("./middleware/uploadMiddleware");

const router = express.Router();

router.get("/image/:objectName", getObject);
router.post("/image", uploadMiddleware, uploadFiles)
router.delete("/image/:objectName", removeObject)

module.exports = router;