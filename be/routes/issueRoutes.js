const express = require("express");
const router = express.Router();
const { reportIssue, getUserIssues } = require("../controllers/issueController");
const upload = require("../uploads/upload");
const verifyToken = require("../middleware/auth");
router.post("/report", verifyToken, upload.single("image"), reportIssue);
router.get("/my-issues", verifyToken, getUserIssues);
module.exports = router;
