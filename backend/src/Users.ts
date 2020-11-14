import RowDataPacket from 'mysql/lib/protocol/packets/RowDataPacket';
import { QueryError } from 'mysql/lib/protocol/sequences/Query';
import { isArray } from 'util';
import express = require('express');
import {OkPacket} from "~mysql/lib/protocol/packets/index";

const app: express.Application = express();
const mysql = require('mysql');

const port = 8001;
app.use(express.json());
const { body, validationResult } = require('express-validator');

const isOkPacket = (obj: Array<RowDataPacket> | OkPacket): obj is OkPacket => 'fieldCount' in obj;

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  port: 3306,
  database: 'final_project',
});

const func = (query: string, args: Array<string | boolean | number>)
  : Promise<Array<RowDataPacket> | OkPacket> => new Promise(
  (resolve, reject) => {
  // eslint-disable-next-line no-unused-vars
    connection.query(query, args, (error: QueryError, results: Array<RowDataPacket> | OkPacket) => {
      if (error) reject(error);
      resolve(results);
    });
  },
);

connection.connect(async (err: QueryError) => {
  if (err) {
    console.error(`error connecting${err.stack}`);
    return;
  }

  await func(`
        CREATE TABLE IF NOT EXISTS Users(
            email VARCHAR(50) NOT NULL PRIMARY KEY,
            name VARCHAR(50) NOT NULL,
            surname VARCHAR(50) NOT NULL,
            birth_date DATE NOT NULL,
            password VARCHAR(50) NOT NULL,
            newsletter TINYINT(1) NOT NULL DEFAULT false
        )ENGINE=INNODB; 
        `, []);
  await func('INSERT INTO Users (email, name, surname, birth_date, password, newsletter) VALUES (?, ?, ?, ?, ?, ?)',
    ['prova2', 'prova2', 'prova3', '1999/08/31', 'prova5', true]);
  console.log(`connection as id ${connection.threadId}`);
});

app.get('/users', async (req, res) => {
  try {
    const selectAll = await func('SELECT * FROM Users', []);
    res.status(200);
    res.send(selectAll);
  } catch (e) {
    res.status(500);
    res.send('server error');
  }
});

app.get('/users/:userId', async (req, res) => {
  try {
    const queryRes = await func('SELECT * FROM Users WHERE id=?', [+req.params.userId]);
    if (!isOkPacket(queryRes) && queryRes.length > 0) {
      res.status(200);
      res.send(queryRes[0]);
    } else {
      res.status(400);
      res.send('User with the given id not found');
    }
  } catch (e) {
    res.status(500);
    res.send('server error');
  }
});

app.post('/users', [
  body('email').isLength({ min: 5 }),
  body('name').isLength({ min: 5 }),
  body('surname').isLength({ min: 5 }),
  body('birth_date').isLength({ min: 5 }),
  body('password').isLength({ min: 1 }),
  body('newsletter').isLength({ min: 1 }),
// eslint-disable-next-line consistent-return
], async (req: express.Request, res: express.Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const insertRes = await func('INSERT INTO Users (email, name, surname, birth_date, password, newsletter) VALUES (?, ?, ?, ?, ?, ?) ',
      [req.body.email, req.body.name, req.body.surname, req.body.birth_date,
        req.body.password, req.body.newsletter]);
    if (isOkPacket(insertRes) && insertRes.affectedRows > 0) {
      res.status(200);
      res.send(insertRes);
    } else {
      // if is not a select should never come here
      console.error(insertRes);
      res.status(500);
      res.send('server error');
    }
  } catch (e) {
    console.error(e);
    res.status(500);
    res.send('server error');
  }
});

app.put('/users/:userId', [
  body('email').isLength({ min: 5 }),
  body('name').isLength({ min: 5 }),
  body('surname').isLength({ min: 5 }),
  body('birth_date').isLength({ min: 5 }),
  body('password').isLength({ min: 1 }),
  body('newsletter').isLength({ min: 1 }),
// eslint-disable-next-line consistent-return
], async (req: express.Request, res: express.Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const x = await func('SELECT * FROM Users WHERE id=?', [+req.params.userId]);
    console.log(x);
    if ('length' in x && x.length > 0) {
      if (x.length > 0) {
        await func('UPDATE Users SET email=?, name=?, surname=?, birth_date=?, password=?, newsletter=? WHERE id=? ',
          [req.body.email, req.body.name, req.body.surname, req.body.birth_date,
            req.body.password, req.body.newsletter, +req.params.userId]);
      }
    } else {
      await func('INSERT INTO Users (email, name, surname, birth_date, password, newsletter) VALUES (?, ?, ?, ?, ?, ?) ',
        [req.body.email, req.body.name, req.body.surname, req.body.birth_date,
          req.body.password, req.body.newsletter]);
    }
    res.status(200);
    res.send('ok');
  } catch (e) {
    console.error(e);
    res.status(500);
    res.send('server error');
  }
});

app.delete('/users/:userId', async (req, res) => {
  try {
    const selectAll = await func('DELETE FROM Users WHERE id=?', [+req.params.userId]);
    console.log(selectAll);
    if (isOkPacket(selectAll)) {
      res.status(200);
      res.send();
    } else {
      // if is not a select should never come here
      res.status(409);
      res.send('DB error');
    }
  } catch (e) {
    console.error(e);
    res.status(500);
    res.send('server error');
  }
});

app.listen(port, async () => {
  console.log(`Example app listening at http://localhost:${port}`);
  await func(`
        CREATE TABLE IF NOT EXISTS Users (
            email VARCHAR(50) NOT NULL PRIMARY KEY,
            name VARCHAR(50) NOT NULL,
            surname VARCHAR(50) NOT NULL,
            birth_date DATE NOT NULL,
            password VARCHAR(50) NOT NULL,
            newsletter TINYINT(1) NOT NULL DEFAULT false
        )ENGINE=INNODB; 
    `, []);
});
