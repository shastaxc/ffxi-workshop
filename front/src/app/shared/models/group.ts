import { IUser } from './user';

export interface IGroup extends IDbMeta {
  name: string;
  members: IUser[];
}
