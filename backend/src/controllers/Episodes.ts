import { Episode } from '@models/Episode';

const { body, validationResult } = require('express-validator');
const db = require('../config/dbConfig');

const episodesController = (app) => {
  app.get('/episodes', async (req, res) => {
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
            case 'seriesId':
              where.whereClause.push('seriesId=?');
              where.whereValue.push(pair[1]);
              break;
            default:
          }
        });

      //  console.log(where);

      const whe: string = where.whereClause.length > 0 ? `WHERE ${where.whereClause.join(',')}` : '';
      //  console.log(whe);

      const selectAll = await db.executeQuery(`SELECT * FROM V_Episodes ${whe} ORDER BY episodeNumber`, where.whereValue);
      //  console.log(selectAll);

      // refactor data from db episodes in api episode
      const episodesArray: Episode[] = selectAll.map((m: any) => ({
        id: m.id,
        title: m.title,
        description: m.description,
        genre: m.genre,
        duration: m.duration,
        actors: m.actors,
        releaseDate: m.releaseDate,
        creationDate: m.creationDate,
        seasonNumber: m.seasonNumber,
        episodeNumber: m.episodeNumber,
        quality: m.quality,
        likes: m.likes,
        views: m.views,
      }));

      res.status(200);
      res.send(episodesArray);
    } catch (e) {
      res.status(500);
      res.send('server error');
    }
  });

  app.get('/Episodes/:input', async (req, res) => {
    try {
      const selectAll = await db.executeQuery('SELECT * FROM Episodes WHERE id=?', [req.params.input]);
      res.status(200);
      res.send(selectAll);
    } catch (e) {
      res.status(500);
      res.send('server error');
    }
  });

  app.delete('/Episodes/:input', async (req, res) => {
    try {
      const selectAll = await db.executeQuery('DELETE FROM Episodes WHERE id=?', [+req.params.input]);
      res.status(200);
      res.send(selectAll);
    } catch (e) {
      console.error(e);
      res.status(500);
      res.send('server error');
    }
  });

  app.put('/Episodes/:input', [
    body('details_id').isLength({ min: 1 }),
    body('quality').isLength({ min: 2 }),
    body('season').isLength({ min: 1 }),
    body('episode').isLength({ min: 1 }),
    body('series_id').isLength({ min: 1 }),
  ], async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const x = await db.executeQuery('SELECT COUNT(id=?) FROM Episodes WHERE id=?', [+req.params.input, +req.params.input]);
      console.log(x);
      if (x > 0) {
        const selectAll = await db.executeQuery('UPDATE Episodes SET details_id=?, quality=?, season=?, episode=?, series_id=? WHERE id=? ',
          [req.body.details_id, req.body.quality, req.body.season, req.body.episode, req.body.series_id, +req.params.input]);
      }
      const selectAll = await db.executeQuery('INSERT INTO Episodes (id, details_id, quality, season, episode, series_id ) VALUES (?, ?, ?, ?, ?) ',
        [+req.params.input, req.body.details_id, req.body.quality, req.body.season, req.body.episode, req.body.series_id]);
      res.status(200);
      res.send('ok');
    } catch (e) {
      console.error(e);
      res.status(500);
      res.send('server error');
    }
  });
};
export default episodesController;
