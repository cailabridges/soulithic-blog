const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth.js");
const userRoutes = require("./routes/users.js");
const postRoutes = require("./routes/posts.js");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const path = require("path");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

const uploadDir = path.resolve(__dirname, "../client/dist/upload");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

app.post("/api/upload", (req, res) => {
  const userImageUpload = multer({ storage: storage }).single("file");

  userImageUpload(req, res, function (err) {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error uploading image", error: err });
    }
    res.status(200).json({ imageUrl: `${req.file.filename}` });
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

const PORT = process.env.PORT || 8800; // Use the port provided by Heroku or default to 8800

app.listen(PORT, () => {
  console.log(`Server connected and listening on port ${PORT}!`);
});
