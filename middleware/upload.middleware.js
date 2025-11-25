import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "upload/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const uploadConfig = multer({ storage });

const uploadSingle = uploadConfig.single("gambar");

export { uploadSingle };
