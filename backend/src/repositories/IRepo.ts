import { User } from '../lib/openapi/model/User';

export default interface IRepo<Model> {
  selectAll(): Promise<Array<Model>>;
  selectById(id: number): Promise<Model | null>;
  insert(m: Model): Promise<Model | null>;
  update(id: number, m: Model): Promise<Model | null>;
  delete(id: number): Promise<boolean>;
}
