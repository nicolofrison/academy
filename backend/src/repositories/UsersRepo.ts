import { User } from '@models/User';
import IRepo from '@repositories/IRepo';

const db = require('../config/dbConfig');

export default class UsersRepo implements IRepo<User> {
  private static instance: UsersRepo;

  // eslint-disable-next-line no-useless-constructor,no-empty-function
  private constructor() {}

  public static getInstance(): UsersRepo {
    if (!UsersRepo.instance) {
      UsersRepo.instance = new UsersRepo();
    }
    return UsersRepo.instance;
  }

  delete = async (id: number): Promise<boolean> => {
    try {
      const deleteRes = await db.executeQuery('DELETE FROM Users WHERE id=?', [id]);
      if (db.isOkPacket(deleteRes) && deleteRes.affectedRows === 1) {
        return new Promise<boolean>((resolve) => resolve(true));
      }
      return new Promise<boolean>((resolve) => resolve(false));
    } catch (e) {
      console.error(e);
      return new Promise<boolean>((resolve) => resolve(false));
    }
  }

  insert = async (u: User): Promise<User> => {
    try {
      const insertRes = await db.executeQuery('INSERT INTO Users (email, name, surname, birthDate, password, newsletter) VALUES (?, ?, ?, ?, ?, ?) ',
        [u.email, u.name, u.surname, u.birthDate, u.password, u.newsletter]);

      if (db.isOkPacket(insertRes) && insertRes.affectedRows > 0) {
        const insertedUser: User = await this.selectById(insertRes.insertId);
        if (insertedUser !== null) {
          return new Promise<User>((resolve) => resolve(insertedUser));
        }
      }
      console.error(insertRes);
      return new Promise<User>((resolve) => resolve(null));
    } catch (e) {
      console.error(e);
      return new Promise<User>((resolve) => resolve(null));
    }
  }

  selectAll = async (): Promise<Array<User>> => {
    try {
      const queryRes = await db.executeQuery('SELECT * FROM Users');
      if (!db.isOkPacket(queryRes)) {
        return new Promise<Array<User>>((resolve) => resolve(queryRes));
      }

      return new Promise<Array<User>>((resolve) => resolve([] as Array<User>));
    } catch (e) {
      console.error(e);
      return new Promise<Array<User>>((resolve) => resolve([] as Array<User>));
    }
  }

  selectById = async (id: number): Promise<User | null> => {
    try {
      const queryRes = await db.executeQuery('SELECT * FROM Users WHERE id=?', [id]);
      if (!db.isOkPacket(queryRes) && queryRes.length > 0) {
        return new Promise<User>((resolve) => resolve(queryRes[0]));
      }

      return new Promise<User>((resolve) => resolve(null));
    } catch (e) {
      console.error(e);
      return new Promise<User>((resolve) => resolve(null));
    }
  }

  update = async (id: number, u: User): Promise<User | null> => {
    try {
      const updateRes = await db.executeQuery('UPDATE Users SET email=?, name=?, surname=?, birthDate=?, password=?, newsletter=? WHERE id=?',
        [u.email, u.name, u.surname, u.birthDate, u.password, u.newsletter, id]);

      if (db.isOkPacket(updateRes) && updateRes.affectedRows > 0) {
        const updatedUser: User = await this.selectById(id);
        if (updatedUser !== null) {
          return new Promise<User>((resolve) => resolve(updatedUser));
        }
      }
      console.error(updateRes);
      return new Promise<User>((resolve) => resolve(null));
    } catch (e) {
      console.error(e);
      return new Promise<User>((resolve) => resolve(null));
    }
  }
}
