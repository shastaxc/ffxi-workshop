import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';
import { clone, isNil } from 'lodash-es';

import { Job } from '@/shared/constants/job.const';
import { OdyBoss } from '@/shared/constants/ody-boss.const';
import { IOdyFightPlan } from '@/shared/models/ody-fight-plan';
import { IOdyPlayer } from '@/shared/models/ody-player';

@Component({
  selector: 'app-ody-composer',
  templateUrl: './ody-composer.component.html',
  styleUrls: ['./ody-composer.component.scss'],
})
export class OdyComposerComponent implements OnInit {

  OdyBoss = OdyBoss;
  odyBossKeys= Object.keys(OdyBoss) as [keyof typeof OdyBoss];

  Job = Job;
  jobKeys = Object.keys(Job) as [keyof typeof Job];

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

  form: FormGroup = new FormGroup({});

  get bossesFormArray(): FormArray {
    return this.form.controls['bosses'] as FormArray;
  }
  get playerFormArray(): FormArray {
    return this.form.controls['players'] as FormArray;
  }

  jobsAvailable: Job[] = Object.values(Job);

  jobAssignments: Job[][][] = [
  // 0   1   2   3   4   5          Bossess
    [[], [], [], [], [], []], // 0: First boss
    [[], [], [], [], [], []], // 1: Second boss
    [[], [], [], [], [], []], // 2: Third boss
  ];

  constructor() { }

  ngOnInit(): void {
    // Add 3 controls, one for each boss
    this.form.addControl('bosses', new FormArray([
      new FormControl(),
      new FormControl(),
      new FormControl(),
    ]));
    // Add 6 controls, one for each party member
    this.form.addControl('players', new FormArray([
      new FormControl(),
      new FormControl(),
      new FormControl(),
      new FormControl(),
      new FormControl(),
      new FormControl(),
    ]));
  }

  bossAt(num: number): OdyBoss | undefined {
    return this.fightPlan.bosses.find(b => b.order === num)?.name;
  }

  jobAssignmentFor(playerName: string, boss: OdyBoss | undefined): Job | undefined {
    if (boss) {
      return this.fightPlan.players.find(p => p.name === playerName)?.assignments.find(a => a.boss === boss)?.job;
    }

    return undefined;
  }

  asFormGroup(input: AbstractControl | FormGroup): FormGroup {
    return input as FormGroup;
  }

  asFormControl(input: AbstractControl | FormControl): FormControl {
    return input as FormControl;
  }

  drop(event: CdkDragDrop<(Job)[]>): void {
    console.log('event', event);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    console.log('assignment: ', this.jobAssignments[0][0][0]);
  }

  getAssignment(bossNum: number, playerNum: number): Job {
    return this.jobAssignments[bossNum][playerNum][0];
  }

  getDropListPredicate(bossNum: number, playerNum: number): (drag: CdkDrag, drop: CdkDropList) => boolean {
    return (drag: CdkDrag, drop: CdkDropList) => {
      // Check if slot is free or not
      return isNil(this.getAssignment(bossNum, playerNum));
    };
  }

}
