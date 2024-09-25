const express = require("express");
const { getObject, uploadFiles, removeObject } = require('./controllers');
const { uploadMiddleware } = require("./middleware/uploadMiddleware");

const router = express.Router();

router.post("", uploadMiddleware, uploadFiles) // /upload better
router.get("/:objectName", getObject);
router.delete("/:objectName", removeObject)

module.exports = router;