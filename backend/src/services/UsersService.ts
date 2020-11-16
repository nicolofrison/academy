import UsersRepo from '@repositories/UsersRepo';
import { User } from '@models/User';

export default class UsersService {
  private static instance: UsersService;

  private usersRepo: UsersRepo;

  private constructor(usersRepo: UsersRepo) {
    this.usersRepo = usersRepo;
  }

  public static getInstance(): UsersService {
    if (!UsersService.instance) {
      UsersService.instance = new UsersService(UsersRepo.getInstance());
    }
    return UsersService.instance;
  }

  public selectAll(): Promise<Array<User>> {
    return this.usersRepo.selectAll();
  }

  public selectById(id: number): Promise<User> {
    return this.usersRepo.selectById(id);
  }

  public insert(u: User): Promise<User> {
    return this.usersRepo.insert(u);
  }

  public async updateOrInsert(id: number, u: User): Promise<User> {
    const updatedUser = await this.usersRepo.update(id, u);
    if (updatedUser === null) {
      return this.usersRepo.insert(u);
    }
    return updatedUser;
  }

  public delete(id: number): Promise<boolean> {
    return this.usersRepo.delete(id);
  }
}
