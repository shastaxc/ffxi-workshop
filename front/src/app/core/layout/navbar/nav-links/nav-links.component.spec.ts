import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';

import { NavLinksComponent } from './nav-links.component';

describe('NavLinksComponent', () => {
  let spectator: Spectator<NavLinksComponent>;
  const createComponent = createComponentFactory(NavLinksComponent);

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
