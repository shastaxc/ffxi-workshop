import { Clipboard } from '@angular/cdk/clipboard';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';
import { isNil } from 'lodash-es';

import { Job } from '@/shared/constants/job.const';
import { OdyBoss } from '@/shared/constants/ody-boss.const';
import { IOdyFightPlan } from '@/shared/models/ody-fight-plan';
import { IOdyPlayer } from '@/shared/models/ody-player';
import { MyValidators } from '@/shared/utils/form-validators';

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
    createdBy: {
      name: 'me',
    },
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
  get playerControls(): FormControl[] {
    return this.playerFormArray.controls as FormControl[];
  }
  get playerNames(): string[] {
    return this.playerControls.map(c => c.value).filter(v => !isNil(v));
  }

  jobsAvailable: Job[] = Object.values(Job);

  // First index = boss, second index = player, third index always an array of size 0-1 with Job
  jobAssignments: Job[][][] = [
  // 0   1   2   3   4   5          Bossess
    [[], [], [], [], [], []], // 0: First boss
    [[], [], [], [], [], []], // 1: Second boss
    [[], [], [], [], [], []], // 2: Third boss
  ];

  constructor(private readonly clipboard: Clipboard) { }

  ngOnInit(): void {
    this.form.addControl('bosses', new FormArray([]));

    // Add 3 controls, one for each boss
    for (let i=0; i<3; i++) {
      this.bossesFormArray.push(new FormControl());
    }

    this.form.addControl('players', new FormArray([], MyValidators.uniqueChildren()));

    // Add 6 controls, one for each party member
    for (let i=0; i<6; i++) {
      this.playerFormArray.push(new FormControl());
    }

    // Listen to changes in array, and mark fields with errors if necessary
    this.playerFormArray.valueChanges.subscribe(value => {
      // Check for error
      const errors = this.playerFormArray.errors;
      if (errors) {
        if (errors['notUnique']) {
          const controls = this.playerControls;
          errors['notUnique'].forEach((errorIndex: number) => {
            controls[errorIndex].setErrors({ notUnique: true });
          });
        }
      }
    });
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

  copyToClipboard(): void {
    const names = this.formatNamesForCopy(this.playerNames);
    let str = '';
    names.forEach((playerName: string, i: number) => {
      // Copy requires player names
      if (playerName) {
        str += '\n'
          + playerName + ' '
          + (this.getAssignment(0, i) || '???')
          + ' '
          + (this.getAssignment(1, i) || '???')
          + ' '
          + (this.getAssignment(2, i) || '???');
      }
    });
    if (str.length > 0) {
      console.log(str);
      this.clipboard.copy(str);
    }
  }

  getErrorMessage(errors: any): string {
    let str = '';

    if (errors.notUnique) {
      str += 'Must be unique!';
    } else {
      str += 'Error';
    }

    return str;
  }

  // Max 117 characters to fit into party chat with /p
  // 78 chars always taken by jobs/formatting; 39 available for names
  formatNamesForCopy(names: string[]): string[] {
    // Remove whitespace
    names.forEach(n => {
      n = n.replace(' ', '');
    });
    const charCount = names.reduce((prev, curr) => prev + curr, '').length;

    let charsToReclaim = charCount - 39;
    // Truncate names down to 6 chars max as needed
    for (let i=0; i<names.length; i++) {
      const name = names[i];
      if (charsToReclaim <= 0) {
        break;
      }
      const initLength = name.length;
      const newLength = Math.max(6, name.length - charsToReclaim);
      names[i] = name.slice(0, newLength);
      // Update chars remaining to reclaim
      const charsReclaimed = initLength - newLength;
      charsToReclaim = charsToReclaim - charsReclaimed;
    }

    return names;
  }

}
