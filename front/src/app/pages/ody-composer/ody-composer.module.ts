import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { OdyComposerComponent } from './ody-composer.component';
import { odyComposerRoutes } from './ody-composer.routes';

import { SharedModule } from '@/shared/common/shared.module';

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
