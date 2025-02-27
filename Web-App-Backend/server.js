console.log(`Server Running: ....`);
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.static('uploads'));

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        cb(null, '[' + Date.now() + ' ms]-' + file.originalname);
    }
});

const upload = multer({ storage });

app.post('/upload', upload.single('file'), (req, res) => {
    res.json({ message: 'File uploaded successfully', filename: req.file.filename });
});

app.get('/files', (req, res) => {
    fs.readdir('uploads/', (err, files) => {
        if (err) return res.status(500).json({ message: 'Error reading files' });
        res.json(files);
    });
});

app.get('/download/:filename', (req, res) => {
    const filePath = path.join(__dirname, 'uploads', req.params.filename);
    res.download(filePath);
});

//  เพิ่ม API สำหรับลบไฟล์
app.delete('/delete/:filename', (req, res) => {
    const filename = decodeURIComponent(req.params.filename); // แก้ไขตรงนี้
    const filePath = path.join(__dirname, 'uploads', filename);
    
    fs.unlink(filePath, (err) => {
        if (err) return res.status(500).json({ message: 'Error deleting file' });
        res.json({ message: 'File deleted successfully' });
    });
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
