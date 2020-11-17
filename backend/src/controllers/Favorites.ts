const { body, validationResult } = require('express-validator');
const db = require('../config/dbConfig');

const { isOkPacket } = db;

const favoritesController = (app) => {
  app.get('/favorites', async (req, res) => {
    try {
      const where = { whereClause: [], whereValue: [] };
      Object.entries(req.query)
        .forEach((pair:any) => {
          switch (pair[0]) {
            case 'usersId':
              where.whereClause.push('usersId LIKE ?');
              where.whereValue.push(pair[1]);
              break;
          }
        });

      const order = { orderClause: [], orderValue: [] };
      Object.entries(req.query)
        .forEach((pair:any) => {
          switch (pair[0]) {
            case 'orderBy':
              order.orderClause.push('?');
              order.orderValue.push(pair[1]);
              break;
            case 'orderType':
              order.orderClause.push('?');
              order.orderValue.push(pair[1]);
              break;
          }
        });

      const orderBy: string = order.orderClause.length > 0 ? ` ORDER BY ?${order.orderClause.length > 1 ? ' ?' : ''}` : '';
      const whe: string = where.whereClause.length > 0 ? ` WHERE ?${where.whereClause.length > 1 ? ' ?' : ''}` : '';

      const selectAll = await db.executeQuery(`SELECT * FROM Favorites ${whe}${orderBy}`, where.whereValue.concat(order.orderValue));
      console.log(selectAll);

      const favoritesArray = selectAll.map((m: any) => ({
        id: m.id,
        usersId: m.usersId,
        moviesId: m.moviesId,
        seriesId: m.seriesId,
      }));

      res.send(favoritesArray);
      res.status(200);
    } catch (e) {
      res.status(500);
      res.send('server error');
    }
  });

  app.get('/favorites/:input', async (req, res) => {
    try {
      const selectAll = await db.executeQuery('SELECT * FROM Favorites WHERE id=?', [req.params.input]);
      res.status(200);
      res.send(selectAll);
    } catch (e) {
      res.status(500);
      res.send('server error');
    }
  });

  app.delete('/favorites/:input', async (req, res) => {
    try {
      const selectAll = await db.executeQuery('DELETE FROM Favorites WHERE id=?', [+req.params.input]);
      res.status(200);
      res.send(selectAll);
    } catch (e) {
      console.error(e);
      res.status(500);
      res.send('server error');
    }
  });

  app.post('/favorites', [
    body('usersId').notEmpty(),
    body('moviesId'),
    body('seriesId'),
  ], async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      let where = '';
      const whereValues = [];
      if (req.body.moviesId) {
        where += ' AND moviesId=?';
        whereValues.push(req.body.moviesId);
      }
      if (req.body.seriesId) {
        where += ' AND seriesId=?';
        whereValues.push(req.body.seriesId);
      }

      const x = await db.executeQuery(`SELECT * FROM Favorites WHERE usersId=?${where}`, [req.body.usersId].concat(whereValues));

      console.log(x);
      if (x.length > 0) {
        res.status(200);
        res.send(x[0]);
      } else {
        const insertQuery = await db.executeQuery('INSERT INTO Favorites (usersId, moviesId, seriesId) VALUES (?, ?, ?) ',
          [req.body.usersId, req.body.moviesId, req.body.seriesId]);

        if (isOkPacket(insertQuery)) {
          const selectFavorite = await db.executeQuery('SELECT * FROM Favorites WHERE id=?', [insertQuery.insertId]);
          if (!isOkPacket(selectFavorite) && selectFavorite.length > 0) {
            res.status(200);
            res.send(selectFavorite[0]);
          } else {
            console.log(selectFavorite);
            res.status(409);
            res.send('ok');
          }
        } else {
          console.log(insertQuery);
          res.status(409);
          res.send('ok');
        }
      }
    } catch (e) {
      console.error(e);
      res.status(500);
      res.send('server error');
    }
  });

  app.put('/favorites/:input', [
    body('user_id').isLength({ min: 1 }),
    body('movies_id').isLength({ min: 1 }),
    body('series_id').isLength({ min: 1 }),
  ], async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const x = await db.executeQuery('SELECT COUNT(id=?) FROM Favorites WHERE id=?', [+req.params.input, +req.params.input]);
      console.log(x);
      if (x > 0) {
        const selectAll = await db.executeQuery('UPDATE Favorites SET user_id=?, movies_id=?, series_id=? WHERE id=? ',
          [req.body.email, req.body.movies_id, req.body.series_id, +req.params.input]);
      }
      const selectAll = await db.executeQuery('INSERT INTO Favorites (id, user_id, movies_id, series_id) VALUES (?, ?, ?, ?) ',
        [+req.params.input, req.body.email, req.body.movies_id, req.body.series_id]);
      res.status(200);
      res.send('ok');
    } catch (e) {
      console.error(e);
      res.status(500);
      res.send('server error');
    }
  });
};
export default favoritesController;
