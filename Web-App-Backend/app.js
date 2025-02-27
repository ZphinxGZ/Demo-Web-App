import express from 'express';
import cors from 'cors';

import filesRouter from './router/filesRouter.js';

const port = 3000
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('./public'));

//routes
app.use('/files',filesRouter);

app.listen(port,() => {
    console.log(`Server is running on port ${port}`);
})