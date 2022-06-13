import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import api from './api.js';

const app = express();

app.use(express.static('@/../dist'));
app.get('/', (req: any, res: any) => res.sendFile('@/../dist/index.html'));

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use('/api', api);

const port = process.env.PORT;
app.listen(port, () => console.log(`Server started at localhost:${port}.`));