import { Route } from '@angular/router';

import { OdyComposerComponent } from './ody-composer.component';

export const odyComposerRoutes: Route[] = [
  {
    path: '',
    component: OdyComposerComponent,
    data: {},
    canActivate: [],
  },
];
