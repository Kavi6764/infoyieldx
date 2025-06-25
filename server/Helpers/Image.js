const multer = require("multer");
const fs = require("fs");
const path = require("path");

const getMulterUploader = (folderName) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const uploadPath = path.join(__dirname, "uploads", folderName);
      fs.mkdirSync(uploadPath, { recursive: true });
      cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });

  const uploader = multer({ storage });
  return uploader;
};


module.exports =getMulterUploader;