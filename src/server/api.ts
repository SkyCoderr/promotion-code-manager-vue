import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import { MongoClient, ServerApiVersion } from 'mongodb';
import { generateCode } from './utils.js';
import IPromotionCode from '@/contracts/IPromotionCode';

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@promotion-code-manager.iw5e3.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { serverApi: ServerApiVersion.v1 });
const db = (await client.connect()).db('pcm');

const api = express.Router();

api.post('/generate', async (req, res) => {
  const body = req.body;
  const generatedCode: IPromotionCode = await generateCode(body);
  try {
    db.collection('codes').insertOne(generatedCode, (error, result) => {
      if (result?.acknowledged) {
        res.status(200).send(generatedCode);
        return;
      }
      res.status(500).send(error);
    });
  }
  catch (error) {
    res.status(500).send(error);
  }
})

api.get('/codes', async (req, res) => {
  try {
    const result = await db.collection('codes').find().toArray();
    res.status(200).send(result);
  }
  catch (error) {
    res.status(500).send(error);
  }

})

export default api;