import { Component, Input } from '@angular/core';

import { SidenavService } from '@/shared/services/sidenav.service';

@Component({
  selector: 'app-nav-links',
  templateUrl: './nav-links.component.html',
  styleUrls: ['./nav-links.component.scss'],
})
export class NavLinksComponent {
  @Input()
    isHorizontal!: boolean;

  constructor(private readonly sidenavService: SidenavService) {}

  closeSidenav(): void {
    this.sidenavService.closeSidenav();
  }
}
