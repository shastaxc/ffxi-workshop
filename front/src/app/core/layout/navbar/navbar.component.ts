import { Component } from '@angular/core';

import { SidenavService } from '@/shared/services/sidenav.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  constructor(private readonly sidenavService: SidenavService) {}

  toggleSidenav(): void {
    this.sidenavService.toggleSidenav();
  }

  closeSidenav(): void {
    this.sidenavService.closeSidenav();
  }
}
