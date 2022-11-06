const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/img/articles/");
  },
  filename: function (req, file, cb) {
    cb(null, "article" + Date.now() + file.originalname);
  },
});
const uploader = multer({ storage: storage });

module.exports = uploader;
