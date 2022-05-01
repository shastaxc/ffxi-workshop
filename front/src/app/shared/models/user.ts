import { IDbMeta } from './db-meta';

export interface IUser extends IDbMeta {
  name: string;
  image?: any;
}
