import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import cookieParser from "cookie-parser";
import multer from "multer";
import path from "path"; // Import path module to resolve file paths

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

// Resolve the absolute path to the upload directory
const uploadDir = path.resolve(__dirname, "../client/dist/upload");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // Use the resolved upload directory path
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
