import express from "express";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();
const baseUrl = `${process.env.BASE_URL + process.env.PORT}/`;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/");
    },
    filename: function (req, file, cb) {
        const ext = file.originalname
            .split(".")
            .filter(Boolean)
            .slice(1)
            .join(".");
        cb(null, Date.now() + "." + ext);
    },
});

const uploadImage = multer({ storage: storage });

router.post("/", uploadImage.single("file"), function (req, res) {
    res.status(200).send({ url: baseUrl + req.file.path });
});

export = router;