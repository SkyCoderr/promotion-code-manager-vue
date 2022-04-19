import express from 'express';

// const express = require('express');
const app = express();

app.use(express.static('@/../dist'));
app.get(/.*/, (req: any, res: any) => res.sendFile('@/../dist/index.html'));

const port = 8000;
app.listen(process.env.PORT || port, () => console.log(`Server started at localhost:${port}.`));