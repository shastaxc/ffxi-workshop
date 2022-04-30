import { Component } from '@angular/core';

import { Job } from '@/shared/constants/job.const';
import { OdyBoss } from '@/shared/constants/ody-boss.const';
import { IOdyFightPlan } from '@/shared/models/ody-fight-plan';
import { IOdyPlayer } from '@/shared/models/ody-player';

@Component({
  selector: 'app-ody-composer',
  templateUrl: './ody-composer.component.html',
  styleUrls: ['./ody-composer.component.scss'],
})
export class OdyComposerComponent {

  playerData: IOdyPlayer[] = [
    {name: 'Kikomizuhara', assignments: [
      {job: Job.WAR, boss: OdyBoss.BUMBA},
      {job: Job.RNG, boss: OdyBoss.AREBATI},
      {job: Job.NIN, boss: OdyBoss.GOGMAGOG},
    ]},
    {name: 'Silvermutt', assignments: [
      {job: Job.DNC, boss: OdyBoss.BUMBA},
      {job: Job.RUN, boss: OdyBoss.AREBATI},
      {job: Job.MNK, boss: OdyBoss.GOGMAGOG},
    ]},
    {name: 'Arminhammer', assignments: [
      {job: Job.WHM, boss: OdyBoss.BUMBA},
      {job: Job.SCH, boss: OdyBoss.AREBATI},
      {job: Job.RDM, boss: OdyBoss.GOGMAGOG},
    ]},
    {name: 'Koruma', assignments: [
      {job: Job.SMN, boss: OdyBoss.BUMBA},
      {job: Job.GEO, boss: OdyBoss.AREBATI},
      {job: Job.BLU, boss: OdyBoss.GOGMAGOG},
    ]},
    {name: 'Neytiri', assignments: [
      {job: Job.DRG, boss: OdyBoss.BUMBA},
      {job: Job.COR, boss: OdyBoss.AREBATI},
      {job: Job.PUP, boss: OdyBoss.GOGMAGOG},
    ]},
    {name: 'Holikow', assignments: [
      {job: Job.THF, boss: OdyBoss.BUMBA},
      {job: Job.BRD, boss: OdyBoss.AREBATI},
      {job: Job.PLD, boss: OdyBoss.GOGMAGOG},
    ]},
  ];

  fightPlan: IOdyFightPlan = {
    bosses: [
      {name: OdyBoss.BUMBA, order: 1},
      {name: OdyBoss.AREBATI, order: 2},
      {name: OdyBoss.GOGMAGOG, order: 3},
    ],
    players: this.playerData,
  };

  constructor() { }

  bossAt(num: number): OdyBoss | undefined {
    return this.fightPlan.bosses.find(b => b.order === num)?.name;
  }

  jobAssignmentFor(playerName: string, boss: OdyBoss | undefined): Job | undefined {
    if (boss) {
      return this.fightPlan.players.find(p => p.name === playerName)?.assignments.find(a => a.boss === boss)?.job;
    }

    return undefined;
  }

}
