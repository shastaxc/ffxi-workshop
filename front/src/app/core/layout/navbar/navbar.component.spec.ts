import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';

import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let spectator: Spectator<NavbarComponent>;
  const createComponent = createComponentFactory(NavbarComponent);

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
