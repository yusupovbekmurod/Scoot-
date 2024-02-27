import fs from "fs";
import path from "path";

export default upload = (req, res, next) => {
    try {
        let { image } = req.files;
        let { name, mimetype, size, md5 } = image;
        name = md5 + name.replace(/\s/g, "");
        req.file = {
            name: "/" + name,
            download: "/download/" + name,
            mimetype,
            size,
            md5,
        };
        if (
            !image.truncated &&
            !fs.existsSync(path.join(process.cwd(), "image", name))
        ) {
            console.log("yozildi");
            image.mv(path.join(process.cwd(), "image", name));
        } else {
            console.log("yozilmadi");
        }

        return next();
    } catch (error) {
        res.send({ a: error.message });
    }
};
