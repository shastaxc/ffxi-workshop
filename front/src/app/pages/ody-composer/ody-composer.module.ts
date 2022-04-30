import { NgModule } from '@angular/core';

import { SharedModule } from '@/shared/common/shared.module';
import { OdyComposerComponent } from './ody-composer.component';
import { RouterModule } from '@angular/router';
import { odyComposerRoutes } from './ody-composer.routes';

const ROUTES = [...odyComposerRoutes];

@NgModule({
  declarations: [
    OdyComposerComponent,
  ],
  imports: [
    RouterModule.forChild(ROUTES),
    SharedModule,
  ],
})
export class OdyComposerModule { }
