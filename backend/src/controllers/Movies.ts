const { body, validationResult } = require('express-validator');
const db = require('../config/dbConfig');

const moviesController = (app) => {
  app.get('/movies', async (req, res) => {
    try {
      const selectAll = await db.executeQuery('SELECT * FROM Movies', []);
      res.status(200);
      res.send(selectAll);
    } catch (e) {
      res.status(500);
      res.send('server error');
    }
  });

  app.get('/movies/:input', async (req, res) => {
    try {
      const selectAll = await db.executeQuery('SELECT * FROM Movies WHERE id=?', [req.params.input]);
      res.status(200);
      res.send(selectAll);
    } catch (e) {
      res.status(500);
      res.send('server error');
    }
  });

  app.delete('/movies/:input', async (req, res) => {
    try {
      const selectAll = await db.executeQuery('DELETE FROM Movies WHERE id=?', [+req.params.input]);
      res.status(200);
      res.send(selectAll);
    } catch (e) {
      console.error(e);
      res.status(500);
      res.send('server error');
    }
  });

  app.put('/movies/:input', [
    body('details_id').isLength({ min: 1 }),
    body('quality').isLength({ min: 1 }),
  ], async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const x = await db.executeQuery('SELECT COUNT(id=?) FROM Movies WHERE id=?', [+req.params.input, +req.params.input]);
      console.log(x);
      if (x > 0) {
        const selectAll = await db.executeQuery('UPDATE Movies SET details_id=?, quality=? WHERE id=? ',
          [req.body.details_id, req.body.quality, +req.params.input]);
      }
      const selectAll = await db.executeQuery('INSERT INTO Movies (details_id, quality) VALUES (?, ?) ',
        [+req.params.input, req.body.details_id, req.body.quality]);
      res.status(200);
      res.send('ok');
    } catch (e) {
      console.error(e);
      res.status(500);
      res.send('server error');
    }
  });
};
export default moviesController;
