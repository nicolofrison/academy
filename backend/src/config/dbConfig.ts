import { QueryError } from 'mysql/lib/protocol/sequences/Query';
import RowDataPacket = require('mysql/lib/protocol/packets/RowDataPacket');
import OkPacket = require('mysql/lib/protocol/packets/OkPacket');

require('dotenv').config();

const dbHost = process.env.MYSQL_HOST;
const dbPort = process.env.MYSQL_PORT;
const dbUser = process.env.MYSQL_USER;
const dbPassword = process.env.MYSQL_PASS;
const dbName = process.env.MYSQL_DB;

const mysql = require('mysql');

const connection = mysql.createPool({
  host: dbHost,
  port: dbPort,
  user: dbUser,
  password: dbPassword,
  database: dbName,
});

const executeQuery = (query, args = []) => new Promise((resolve, reject) => {
  connection.query(query, args,
    (error: QueryError, results: RowDataPacket[] | OkPacket) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
      connection.releaseConnection(this);
    });
});
exports.executeQuery = executeQuery;

exports.isOkPacket = (obj: Array<RowDataPacket> | OkPacket): obj is OkPacket => 'fieldCount' in obj;

executeQuery('SELECT * FROM Users')
  .then()
  .catch((e) => {
    console.error(e);
    if (e.errno === 1251) {
      console.log(`${e.sqlMessage}\nexecute in db the following command:\nALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'`);
    }
  })
  .finally();
