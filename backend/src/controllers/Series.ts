const { body, validationResult } = require('express-validator');
const db = require('../config/dbConfig');

const { isOkPacket } = db;

const seriesController = (app) => {
  app.get('/series', async (req, res) => {
    try {
      const where = { whereClause: [], whereValue: [] };
      Object.entries(req.query)
        .forEach((pair:any) => {
        // console.log(pair);
          switch (pair[0]) {
            case 'filterByName':
              where.whereClause.push('title LIKE ?');
              where.whereValue.push(pair[1]);
              break;
            case 'filterByGenre':
              where.whereClause.push('genre=?');
              where.whereValue.push(pair[1]);
              break;
            case 'filterByReleaseDate':
              where.whereClause.push('YEAR(releaseDate)=?');
              where.whereValue.push(pair[1]);
              break;
            case 'filterByRating':
              where.whereClause.push('rating=?');
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

      // console.log(where);
      // console.log(order);

      const orderBy: string = order.orderClause.length > 0 ? ` ORDER BY ?${order.orderClause.length > 1 ? ' ?' : ''}` : '';
      const whe: string = where.whereClause.length > 0 ? ` WHERE ?${where.whereClause.length > 1 ? ' ?' : ''}` : '';

      const selectAll = await db.executeQuery(`SELECT * FROM V_Series ${whe}${orderBy}`, where.whereValue.concat(order.orderValue));
      //  console.log(selectAll);

      const seriesArray = selectAll.map((m: any) =>
        // conversione da dati di db al tipo Movie
        ({
          id: m.id,
          title: m.title,
          description: m.description,
          genre: m.genre,
          duration: m.duration,
          actors: m.actors,
          releaseDate: m.releaseDate,
          creationDate: m.creationDate,
          seasonNumber: m.seasonNumber,
          likes: m.likes,
          rating: m.rating,

        }));

      res.status(200);
      res.send(seriesArray);
    } catch (e) {
      res.status(500);
      res.send('server error');
    }
  });

  app.get('/series/:input', async (req, res) => {
    try {
      const selectAll = await db.executeQuery('SELECT * FROM V_Series WHERE id=?', [+req.params.input]);

      if (!isOkPacket(selectAll) && selectAll.length > 0) {
        res.status(200);
        res.send(selectAll[0]);
      } else {
        console.error(selectAll);
        res.status(409);
        res.send('');
      }
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
