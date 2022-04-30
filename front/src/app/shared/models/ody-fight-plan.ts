import { OdyBoss } from '../constants/ody-boss.const';
import { IOdyPlayer } from './ody-player';

export interface IOdyFightPlan {
  bosses: {name: OdyBoss, order: number}[],
  players: IOdyPlayer[]
}
