import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import multer from "multer";
import path from "path";

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

// Dynamic imports for ES Modules
Promise.all([
  import("./api/routes/auth.js"),
  import("./api/routes/users.js"),
  import("./api/routes/posts.js"),
])
  .then(([authRoutes, userRoutes, postRoutes]) => {
    app.use("/api/auth", authRoutes.default);
    app.use("/api/users", userRoutes.default);
    app.use("/api/posts", postRoutes.default);
  })
  .catch((err) => {
    console.error("Error importing modules:", err);
  });

const PORT = process.env.PORT || 8800; // Use the port provided by Heroku or default to 8800

app.listen(PORT, () => {
  console.log(`Server connected and listening on port ${PORT}!`);
});
