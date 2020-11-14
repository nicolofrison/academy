import UsersService from '@services/UsersService';
import * as Express from 'express';

const { body, validationResult } = require('express-validator');

export default class UsersController {
  private static instance: UsersController;

  private usersService: UsersService;

  private constructor(usersService: UsersService) {
    this.usersService = usersService;
  }

  public static init(app: Express.Application) {
    if (!UsersController.instance) {
      UsersController.instance = new UsersController(UsersService.getInstance());

      UsersController.instance.getUsers(app);
      UsersController.instance.getUser(app);
      UsersController.instance.post(app);
      UsersController.instance.put(app);
      UsersController.instance.delete(app);
    }
  }

  private getUsers(app: Express.Application): void {
    app.get('/users', async (req, res) => {
      try {
        res.status(200);
        res.send(await this.usersService.selectAll());
      } catch (e) {
        res.status(500);
        res.send('server error');
      }
    });
  }

  private getUser(app: Express.Application): void {
    app.get('/users/:id', async (req, res) => {
      try {
        const user = await this.usersService.selectById(+req.params.id);
        if (user !== null) {
          res.status(200);
          res.send(user);
        } else {
          res.status(400);
          res.send();
        }
      } catch (e) {
        res.status(500);
        res.send('server error');
      }
    });
  }

  private post(app: Express.Application): void {
    app.post('/users', [
      body('email').isLength({ min: 5 }),
      body('name').isLength({ min: 5 }),
      body('surname').isLength({ min: 5 }),
      body('birthDate').isLength({ min: 5 }),
      body('password').isLength({ min: 1 }),
      body('newsletter').isLength({ min: 1 }),
      // eslint-disable-next-line consistent-return
    ], async (req: Express.Request, res: Express.Response) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

        // @ts-ignore
        const newUser = await this.usersService.insert(req.body);
        if (newUser !== null) {
          res.status(200);
          res.send(newUser);
        } else {
          res.status(400);
          res.send('');
        }
      } catch (e) {
        console.error(e);
        res.status(500);
        res.send('server error');
      }
    });
  }

  private put(app: Express.Application): void {
    app.put('/users/:id', [
      body('email').isLength({ min: 5 }),
      body('name').isLength({ min: 5 }),
      body('surname').isLength({ min: 5 }),
      body('birthDate').isLength({ min: 5 }),
      body('password').isLength({ min: 1 }),
      body('newsletter').isLength({ min: 1 }),
      // eslint-disable-next-line consistent-return
    ], async (req: Express.Request, res: Express.Response) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

        // @ts-ignore
        const user = await this.usersService.updateOrInsert(+req.params.id, req.body);
        if (user !== null) {
          res.status(200);
          res.send(user);
        } else {
          res.status(400);
          res.send('');
        }
      } catch (e) {
        console.error(e);
        res.status(500);
        res.send('server error');
      }
    });
  }

  private delete(app: Express.Application): void {
    app.delete('/users/:id', async (req, res) => {
      try {
        if (await this.usersService.delete(+req.params.id)) {
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
  }
}
