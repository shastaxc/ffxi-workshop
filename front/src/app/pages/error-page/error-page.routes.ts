import { Route } from '@angular/router';
import { ErrorPageComponent } from './error-page.component';

export const errorPageRoutes: Route[] = [
  {
    path: '**',
    component: ErrorPageComponent,
    data: {},
    canActivate: [],
  }
]
