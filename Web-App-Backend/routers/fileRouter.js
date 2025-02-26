import { Router } from "express";
import fs from 'node:fs';

const fileRouter = Router();

fileRouter.get("/list", (req, res) => {
    fs.readdir('./public', (err, files) => {
        if (err) res.status(500).json({ message: err.message });
        let data = []
        files.forEach(file => {
            const obj = { name: file, url: `http://localhost:3000/${file}` };
            data.push(obj);  
        });
        res.status(200).json(data);
    })
});

export default fileRouter;