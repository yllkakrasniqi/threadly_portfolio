const multer = require("multer");

// This is needed to get files from the request
const upload = multer({ storage: multer.memoryStorage() });

exports.uploadMiddleware = (req, res, next) => {
  // 5 is maximum number of files that can be upload in one request
  upload.array("file", 5)(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    // Retrieve upload files
    const files = req.files;
    const errors = [];

    // Validate file type and size
    files.forEach((file) => {
      const allowedTypes = ["image/jpeg", "image/png"];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!allowedTypes.includes(file.mimetype)) {
        errors.push(`Invalid file type: ${file.originalname}`);
      }

      if (file.size > maxSize) {
        errors.push(`File too large: ${file.originalname}`);
      }
    });

    if (errors.length > 0) {
      // Remove uploaded files
      // files.forEach((file) => {
      //   fs.unlinkSync(file.path);
      // });

      return res.status(400).json({ errors });
    }

    // Attach files to the request object
    req.files = files;

    // Proceed to the next middleware or route handler
    next();
  });
};
