import express from 'express';
import cors from 'cors';  

import fileRouter from './routers/fileRouter.js';

const port = 3000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('./public'));

// Routes
app.use("/files", fileRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});