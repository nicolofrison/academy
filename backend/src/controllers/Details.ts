const { body, validationResult } = require('express-validator');
const db = require('../config/dbConfig');

const detailsController = (app) => {
  app.get('/details', async (req, res) => {
    try {
      const selectAll = await db.executeQuery('SELECT * FROM details', []);
      res.status(200);
      res.send(selectAll);
    } catch (e) {
      res.status(500);
      res.send('server error');
    }
  });

  app.get('/details/:input', async (req, res) => {
    try {
      const selectAll = await db.executeQuery('SELECT * FROM Details WHERE id=?', [req.params.input]);
      res.status(200);
      res.send(selectAll);
    } catch (e) {
      res.status(500);
      res.send('server error');
    }
  });

  app.delete('/details/:input', async (req, res) => {
    try {
      const selectAll = await db.executeQuery('DELETE FROM Details WHERE id=?', [+req.params.input]);
      res.status(200);
      res.send(selectAll);
    } catch (e) {
      console.error(e);
      res.status(500);
      res.send('server error');
    }
  });

  app.put('/details/:input', [
    body('title').isLength({ min: 5 }),
    body('description').isLength({ min: 5 }),
    body('genre').isLength({ min: 5 }),
    body('duration').isLength({ min: 1 }),
    body('actors').isLength({ min: 5 }),
    body('release_date').isLength({ min: 1 }),
    body('creation_date').isLength({ min: 5 }),
  ], async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const x = await db.executeQuery('SELECT COUNT(id=?) FROM Details WHERE id=?', [+req.params.input, +req.params.input]);
      console.log(x);
      if (x > 0) {
        const selectAll = await db.executeQuery('UPDATE Details SET title=?, description=?, genre=?, duration=?, actors=?, release_date=?, creation_date=? WHERE id=? ',
          [req.body.title, req.body.description, req.body.genre, req.body.duration, req.body.actors, req.body.release_date, req.body.creation_date, +req.params.input]);
      }
      const selectAll = await db.executeQuery('INSERT INTO Details (id, title, description, genre, duration, actors, release_date, creation_date) VALUES (?, ?, ?, ?, ?, ?, ?) ',
        [+req.params.input, req.body.title, req.body.description, req.body.genre, req.body.duration, req.body.actors, req.body.release_date, req.body.creation_date]);
      res.status(200);
      res.send('ok');
    } catch (e) {
      console.error(e);
      res.status(500);
      res.send('server error');
    }
  });
};
export default detailsController;
