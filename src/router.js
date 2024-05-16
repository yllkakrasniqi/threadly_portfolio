const express = require("express");
const { getObject } = require('./controllers')

const router = express.Router();

router.get("/image/:objectName", getObject);

module.exports = router;