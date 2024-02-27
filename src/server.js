import express from "express";
const app = express();
const PORT = 3000;
import { userRouter } from "./router/users.router.js"
import path from "path";

import fileUpload from "express-fileupload";
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), "image")));
app.use(fileUpload())

app.use("/books", userRouter)

app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
}));

app.post('/upload', function (req, res) {
    let { images } = req.files;
    let {
        size, encoding, mimetype, md5,
    } = images;
    console.log(size, encoding, mimetype, md5);
    console.log(images.mv(process.cwd(), + "/src" + "/Upload/" + images.md5 + ".jpg"));
});

app.listen(
    PORT,
    console.log("server is running .. http://localhost:" + PORT)
);
