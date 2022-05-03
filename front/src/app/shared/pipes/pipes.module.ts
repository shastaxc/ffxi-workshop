import { NgModule } from '@angular/core';

import { TierFilterPipe } from '@/shared/pipes/filter.pipe';

@NgModule({
  declarations: [
    TierFilterPipe,
  ],
  exports: [
    TierFilterPipe,
  ],
})
export class PipesModule { }
