const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // folder where images are stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // unique filename
  }
});

const upload = multer({ storage });

module.exports = upload;
