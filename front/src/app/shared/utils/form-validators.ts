import { AbstractControl, FormArray, FormControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { isNil } from 'lodash-es';

export class MyValidators {
  // Compares current Control's value to a provided list of values. Error if num of matches exceeds threshold.
  public static unique(allowedNumMatches?: number): ValidatorFn {

    return (input: AbstractControl): ValidationErrors | null => {
      if (isNil(allowedNumMatches)) {
        allowedNumMatches = 1;
      }

      // Get parent
      let compareList: FormControl[] = (input.parent?.controls as FormControl[]) || [];
      // Remove null/undefined entries from array
      compareList = compareList.map(c => c.value).filter(val => !isNil(val));

      if (compareList?.length < 2) {
        return null;
      }
      const value = (input as FormControl).value;

      // Count # occurences of each value
      let count = 0;
      for (const val of compareList) {
        if (value === val) {
          count++;
        }
        if (count > allowedNumMatches) {
          return {
            unique: false,
          };
        }
      }

      return null;
    };
  }

  public static uniqueChildren(): ValidatorFn {
    return (input: AbstractControl): ValidationErrors | null => {
      const group = input as FormArray | FormGroup;
      // Get array of control values
      const compareList = (group.controls as FormControl[]).map(control => control.value);

      if (compareList?.length < 2) {
        return null;
      }

      // Initialize count array with same length as compare list, and fill with zeroes.
      const dup = compareList.map(() => 0);

      for (let i=0; i<compareList.length-1; i++) {
        const val1 = compareList[i];
        if (dup[i] > 0) {
          continue;
        }
        // Count duplicates in same array
        for (let j=i+1; j<compareList.length; j++) {
          const val2 = compareList[j];
          if (isNil(val1) && isNil(val2)) {
            continue;
          }
          if (val1 === val2) {
            dup[i]++;
            dup[j]++;
            if (dup[i] > 1) {
              // No need to keep counting, this index already marked as duplicated
              continue;
            }
          }
        }
      }

      // If any count > 1, add index to list
      const duplicateIndices: number[] = [];
      dup.forEach((c: number, i: number) => {
        if (c > 0) {
          duplicateIndices.push(i);
        }
      });

      if (duplicateIndices.length > 0) {
        // Return error
        return {
          notUnique: duplicateIndices,
        };
      }

      return null;
    };
  }
}
