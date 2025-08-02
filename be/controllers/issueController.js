const reportIssue = async (req, res) => {
  try {
    const { title, description, category, location, isAnonymous } = req.body;
    const imageUrl = req.file ? req.file.path : null;

    if (description.trim().split(/\s+/).length < 5) {
      return res.status(400).json({ message: "Description must be at least 5 words." });
    }

    // 👇 If user is not anonymous, attach user ID
    const issueData = {
      title,
      description,
      category,
      location,
      isAnonymous,
      imageUrl,
    };

    if (!isAnonymous && req.user && req.user.id) {
      issueData.user = req.user.id; // assuming JWT sets req.user.id
    }

    const issue = new Issue(issueData);
    await issue.save();

    res.status(201).json({ success: true, message: "Issue reported successfully", data: issue });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};
const Issue = require("../models/Issue");

const getUserIssues = async (req, res) => {
  try {
    const userId = req.user._id; // From the auth middleware
    const issues = await Issue.find({ user: userId }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, issues });
  } catch (error) {
    res.status(500).json({ success: false, message: "Could not fetch issues", error: error.message });
  }
};
module.exports={reportIssue,getUserIssues};