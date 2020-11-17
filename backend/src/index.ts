import UsersController from '@controllers/UsersController';
import viewsController from '@controllers/Views';
import * as Express from 'express';
import detailsController from '@controllers/Details';
import episodesController from '@controllers/Episodes';
import favoritesController from '@controllers/Favorites';
import likesController from '@controllers/Likes';
import moviesController from '@controllers/Movies';
import reviewsController from '@controllers/Reviews';
import seriesController from '@controllers/Series';

const express = require('express');
const cors = require('cors');

require('dotenv').config();
const app: Express.Application = express();
const port = process.env.APP_PORT;
app.use(express.json());
app.use(cors());

//  Controllers
detailsController(app);
episodesController(app);
favoritesController(app);
likesController(app);
moviesController(app);
reviewsController(app);
seriesController(app);
UsersController.init(app);
viewsController(app);

app.listen(port, async () => {
  console.log(`Netflop backend listening at http://localhost:${port}`);
});
