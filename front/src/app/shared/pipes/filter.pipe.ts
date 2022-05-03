import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tierFilter',
})
export class TierFilterPipe implements PipeTransform {
  constructor() {}

  transform(items: Partial<{tier: number}>[], tier: number): any {
    return items.filter(item => item.tier === tier);
  }
}
