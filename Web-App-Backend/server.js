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
app.use(express.json());

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        const timestamp = new Date().toISOString().replace(/:/g, '-').replace('T', ' ').split('.')[0];
        cb(null, `[${timestamp}]-${file.originalname}`);
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

// app.post('/api/register', (req, res) => {
//     const { username, password } = req.body;
//     const usersFilePath = path.resolve(__dirname, '../Web-App-Frontend/public/Users.js');
//     const users = require(usersFilePath);

//     const userExists = users.some(user => user.username === username);
//     if (userExists) {
//         return res.status(400).json({ message: 'Username already exists' });
//     }

//     const newUser = { username, password };
//     users.push(newUser);
//     fs.writeFileSync(usersFilePath, `const UserAndPass = ${JSON.stringify(users)};\n\nexport default UserAndPass;`);
//     res.status(200).json({ message: 'Registration successful' });
// });

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
