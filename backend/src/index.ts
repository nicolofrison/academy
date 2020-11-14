import UsersController from '@controllers/UsersController';
import * as Express from 'express';

const express = require('express');

require('dotenv').config();

const app: Express.Application = express();
const port = process.env.APP_PORT;
app.use(express.json());

//  Controllers
UsersController.init(app);

app.listen(port, async () => {
  console.log(`Netflop backend listening at http://localhost:${port}`);
});
