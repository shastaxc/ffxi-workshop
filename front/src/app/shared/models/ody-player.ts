import { Job } from '../constants/job.const';
import { OdyBoss } from '../constants/ody-boss.const';

export interface IOdyPlayer {
  name: string,
  assignments: {job: Job, boss: OdyBoss}[]
}
