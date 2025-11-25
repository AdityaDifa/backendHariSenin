const upload = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "failed to upload" });
  }

  // 🚨 PERBAIKAN: Akses metadata file
  const fileName = req.file.filename;

  res.status(200).json({
    message: "file uploaded successfully",
    fileName: fileName,
    path: req.file.path,
  });
};

export { upload };
