const { body, validationResult } = require('express-validator');
const db = require('../config/dbConfig');

const reviewsController = (app) => {
  app.get('/reviews', async (req, res) => {
    try {
      const selectAll = await db.executeQuery('SELECT * FROM Reviews', []);
      res.status(200);
      res.send(selectAll);
    } catch (e) {
      res.status(500);
      res.send('server error');
    }
  });

  app.get('/reviews/:input', async (req, res) => {
    try {
      const selectAll = await db.executeQuery('SELECT * FROM Reviews WHERE id=?', [req.params.input]);
      res.status(200);
      res.send(selectAll);
    } catch (e) {
      res.status(500);
      res.send('server error');
    }
  });

  app.delete('/reviews/:input', async (req, res) => {
    try {
      const selectAll = await db.executeQuery('DELETE FROM Reviews WHERE id=?', [+req.params.input]);
      res.status(200);
      res.send(selectAll);
    } catch (e) {
      console.error(e);
      res.status(500);
      res.send('server error');
    }
  });

  app.put('/reviews/:input', [
    body('email').isLength({ min: 1 }),
    body('movies_id').isLength({ min: 1 }),
    body('series_id').isLength({ min: 1 }),
    body('rating').isLength({ min: 1 }),
    body('description').isLength({ min: 1 }),
  ], async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const x = await db.executeQuery('SELECT COUNT(id=?) FROM Reviews WHERE id=?', [+req.params.input, +req.params.input]);
      console.log(x);
      if (x > 0) {
        const selectAll = await db.executeQuery('UPDATE Reviews SET email=?, movies_id=?, series_id=?, rating=?, description=? WHERE id=? ',
          [req.body.email, req.body.movies_id, , req.body.series_id, req.body.rating, req.body.description, +req.params.input]);
      }
      const selectAll = await db.executeQuery('INSERT INTO Reviews (email, movies_id, series_id, rating, description) VALUES (?, ?, ?, ?, ?) ',
        [+req.params.input, req.body.email, req.body.movies_id, , req.body.series_id, req.body.rating, req.body.description]);
      res.status(200);
      res.send('ok');
    } catch (e) {
      console.error(e);
      res.status(500);
      res.send('server error');
    }
  });
};
export default reviewsController;
