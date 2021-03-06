const { body, validationResult } = require('express-validator');
const db = require('../config/dbConfig');

const likesController = (app) => {
  app.get('/likes', async (req, res) => {
    try {
      const selectAll = await db.executeQuery('SELECT * FROM Likes', []);
      res.status(200);
      res.send(selectAll);
    } catch (e) {
      res.status(500);
      res.send('server error');
    }
  });

  app.get('/likes/:input', async (req, res) => {
    try {
      const selectAll = await db.executeQuery('SELECT * FROM Likes WHERE id=?', [req.params.input]);
      res.status(200);
      res.send(selectAll);
    } catch (e) {
      res.status(500);
      res.send('server error');
    }
  });

  app.delete('/likes/:input', async (req, res) => {
    try {
      const selectAll = await db.executeQuery('DELETE FROM Likes WHERE id=?', [+req.params.input]);
      res.status(200);
      res.send(selectAll);
    } catch (e) {
      console.error(e);
      res.status(500);
      res.send('server error');
    }
  });

  app.put('/likes/:input', [
    body('email').isLength({ min: 5 }),
    body('episodes_id').isLength({ min: 1 }),
    body('movies_id').isLength({ min: 1 }),
    body('series_id').isLength({ min: 1 }),
  ], async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const x = await db.executeQuery('SELECT COUNT(id=?) FROM Likes WHERE id=?', [+req.params.input, +req.params.input]);
      console.log(x);
      if (x > 0) {
        const selectAll = await db.executeQuery('UPDATE Likes SET email=?, episodes_id=?, movies_id, series_id, WHERE id=? ',
          [req.body.email, req.body.episodes_id, req.body.movies_id, req.body.series_id, +req.params.input]);
      }
      const selectAll = await db.executeQuery('INSERT INTO Likes (email, episodes_id, movies_id, series_id) VALUES (?, ?, ?, ?) ',
        [+req.params.input, req.body.email, req.body.episodes_id, req.body.movies_id, req.body.series_id]);
      res.status(200);
      res.send('ok');
    } catch (e) {
      console.error(e);
      res.status(500);
      res.send('server error');
    }
  });
};
export default likesController;
