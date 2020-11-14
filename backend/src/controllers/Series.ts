const { body, validationResult } = require('express-validator');
const db = require('../config/dbConfig');

const seriesController = (app) => {
  app.get('/series', async (req, res) => {
    try {
      const selectAll = await db.executeQuery('SELECT * FROM Series', []);
      res.status(200);
      res.send(selectAll);
    } catch (e) {
      res.status(500);
      res.send('server error');
    }
  });

  app.get('/series/:input', async (req, res) => {
    try {
      const selectAll = await db.executeQuery('SELECT * FROM Series WHERE id=?', [req.params.input]);
      res.status(200);
      res.send(selectAll);
    } catch (e) {
      res.status(500);
      res.send('server error');
    }
  });

  app.delete('/series/:input', async (req, res) => {
    try {
      const selectAll = await db.executeQuery('DELETE FROM Series WHERE id=?', [+req.params.input]);
      res.status(200);
      res.send(selectAll);
    } catch (e) {
      console.error(e);
      res.status(500);
      res.send('server error');
    }
  });

  app.put('/series/:input', [
    body('details_id').isLength({ min: 5 }),
  ], async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const x = await db.executeQuery('SELECT COUNT(id=?) FROM Series WHERE id=?', [+req.params.input, +req.params.input]);
      console.log(x);
      if (x > 0) {
        const selectAll = await db.executeQuery('UPDATE Series SET details_id=? WHERE id=? ',
          [req.body.details_id, +req.params.input]);
      }
      const selectAll = await db.executeQuery('INSERT INTO Series (details_id) VALUES (?) ',
        [+req.params.input, req.body.details_id]);
      res.status(200);
      res.send('ok');
    } catch (e) {
      console.error(e);
      res.status(500);
      res.send('server error');
    }
  });
};
export default seriesController;
