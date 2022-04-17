import express from 'express';

const app = express();

app.use(express.static('@/../dist'));
app.get(/.*/, (req, res) => res.sendFile('@/../dist/index.html'));

const port = 8000;
app.listen(port, () => console.log(`Server started at localhost:${port}.`));