import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import {router} from './src/routes/index.js';
import {connectMongo} from './src/datasources/ak247/dbConnect.js';
import {handleFileCSV} from './handleFileCSV.js';

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.options('*', cors());
app.use(express.json());

app.listen(3004, () => {
  // connectMongo();
  handleFileCSV();
  app.use(router);
  console.log('Listen on port 3004');
});
