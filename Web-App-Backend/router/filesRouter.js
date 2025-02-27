import { Router } from "express";
import multer from "multer";
import fs from "node:fs";

const storage = multer.diskStorage({
    //set destination
    destination: (req, file, cb) => {
        cb(null, './public');
    },
    //set filename
    filename: (req, file, cb) => {
        const filename = Date.now() + '-' + file.originalname;
        cb(null, filename);
    }
})
const upload = multer({ storage }); //middleware

const filesRouter = Router();

//CRUD/API
filesRouter.get("/list", (req, res) => {
  fs.readdir("./public", (err, files) => {
    if (err) res.status(500).json({ message: err.message });
    let data = [];
    files.forEach((file) => {
      const obj = { name: file, url: `http://localhost:3000/${file}` };
      data.push(obj);
    });
    res.status(200).json(data);
  });
});

filesRouter.post('/upload', upload.single('test'), (req,res) => {
    res.status(200).json({ message: 'File uploaded successfully'});
})
export default filesRouter;
