import { OdyBoss } from '../constants/ody-boss.const';
import { IOdyPlayer } from './ody-player';
import { IUser } from './user';

export interface IOdyFightPlan {
  createdBy: IUser;
  bosses: {name: OdyBoss, order: number}[],
  players: IOdyPlayer[]
}
