import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { homeRoutes } from './home.routes';

import { SharedModule } from '@/shared/common/shared.module';

const ROUTES = [...homeRoutes];

@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    RouterModule.forChild(ROUTES),
    SharedModule,
  ],
})
export class HomeModule { }
