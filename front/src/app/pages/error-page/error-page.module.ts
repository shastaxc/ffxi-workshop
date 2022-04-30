import { NgModule } from '@angular/core';

import { SharedModule } from '@/shared/common/shared.module';
import { RouterModule } from '@angular/router';
import { ErrorPageComponent } from './error-page.component';
import { errorPageRoutes } from './error-page.routes';

const ROUTES = [...errorPageRoutes];

@NgModule({
  declarations: [
    ErrorPageComponent,
  ],
  imports: [
    RouterModule.forChild(ROUTES),
    SharedModule,
  ],
})
export class ErrorPageModule { }
