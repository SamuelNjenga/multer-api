const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload = multer({
  storage: multer.diskStorage({}),
});

app.post("/upload", upload.single("file"), async (req, res) => {
  //   res.send(req.file);
  try {
    const result = await cloudinary.uploader.upload(
      req.file.path
    );
    console.log(req.file.path);
    res.send({
      status: "success",
      img_url: result.secure_url,
    });
  } catch (err) {
    console.log(err);
  }
});

app.listen(8000, function () {
  return console.log("Server started on port 8000");
});
