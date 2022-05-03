import { Clipboard } from '@angular/cdk/clipboard';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';
import { cloneDeep, isNil } from 'lodash-es';

import { Job } from '@/shared/constants/job.const';
import { ODY_BOSS_INFO,OdyBoss } from '@/shared/constants/ody-boss.const';
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
  // odyBossKeys= Object.keys(OdyBoss) as [keyof typeof OdyBoss];
  odyBossInfo = ODY_BOSS_INFO;

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

  jobsAvailable: Job[] = Object.values(Job).sort((a, b) => a.localeCompare(b));

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
    const isSourceAvailableJobPool = event.previousContainer.id  === "available-job-pool";
    const isTargetAvailableJobPool = event.container.id  === "available-job-pool";

    // Do not allow moving in same container
    if (event.previousContainer === event.container) {
      return;
    }

    // If neither the source nor target container is the "available job pool", swap contents.
    if (!isSourceAvailableJobPool && !isTargetAvailableJobPool) {
      const temp: Job[] = [];

      transferArrayItem(
        event.previousContainer.data,
        temp,
        event.previousIndex,
        event.currentIndex,
      );

      transferArrayItem(
        event.container.data,
        event.previousContainer.data,
        event.previousIndex,
        event.currentIndex,
      );

      transferArrayItem(
        temp,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    } else {
      // If source or target is "available job pool" do a simple unidirectional content transfer.
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      // Sort available job pool
      this.jobsAvailable.sort((a, b) => a.localeCompare(b));
    }
  }

  getAssignment(bossNum: number, playerNum: number): Job {
    return this.jobAssignments[bossNum][playerNum][0];
  }

  copyPlanToClipboard(): void {
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

  copyAvailableJobsToClipboard(): void {
    let str = 'Available:';
    this.jobsAvailable.forEach((j: Job) => {
      str += ' ' + j.toString();
    });
    console.log(str);
    this.clipboard.copy(str);
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

  // Swaps player job assignments and boss selection for column provided and the one to the right of it.
  swapCol(i: number): void {
    // Swap boss selections
    const leftBossControl: FormControl = this.bossesFormArray.controls[i] as FormControl;
    const rightBossControl: FormControl = this.bossesFormArray.controls[i+1] as FormControl;

    const tmpBoss = leftBossControl.value;
    leftBossControl.setValue(rightBossControl.value);
    rightBossControl.setValue(tmpBoss);

    // Swap player assignments
    const tmpAssign = cloneDeep(this.jobAssignments[i]);
    this.jobAssignments[i] = cloneDeep(this.jobAssignments[i+1]);
    this.jobAssignments[i+1] = tmpAssign;
  }

  // Unassign job and move it back into the list of available jobs.
  // Returning false prevents context menu from popping up.
  unassignJob(i: number, j: number): boolean {
    const job = this.jobAssignments[i][j][0];
    // Do nothing if no job assigned.
    if (!job) {
      return false;
    }
    // Add job back to available list
    this.jobsAvailable.push(job);
    // Sort available job pool
    this.jobsAvailable.sort((a, b) => a.localeCompare(b));

    // Unset job assignment
    this.jobAssignments[i][j] = [];

    return false;
  }

}
