import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';

import { SidenavInnardsComponent } from './sidenav-innards.component';

describe('SidenavInnardsComponent', () => {
  let spectator: Spectator<SidenavInnardsComponent>;
  const createComponent = createComponentFactory(SidenavInnardsComponent);

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
