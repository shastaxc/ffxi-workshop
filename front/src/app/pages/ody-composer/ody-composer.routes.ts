import { Route } from '@angular/router';

import { OdyComposerComponent } from './ody-composer.component';

export const odyComposerRoutes: Route[] = [
  {
    path: '/ody-composer',
    component: OdyComposerComponent,
    data: {},
    canActivate: [],
  },
];
