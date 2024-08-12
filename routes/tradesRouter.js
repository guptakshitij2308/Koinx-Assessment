const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const tradesController = require("../controller/tradesController");

const upload = multer({
  dest: path.join(__dirname, "../uploads/"),
  limits: { fileSize: 10 * 1024 * 1024 },
});

router.post("/upload_csv", upload.single("file"), tradesController.uploadCsv);

module.exports = router;
