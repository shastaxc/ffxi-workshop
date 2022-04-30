import { NgModule } from '@angular/core';

import { NavLinksComponent } from './navbar/nav-links/nav-links.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidenavInnardsComponent } from './sidenav-innards/sidenav-innards.component';
import { LayoutComponent } from './layout.component';
import { SidenavService } from './sidenav.service';

import { SharedModule } from '@/shared/common/shared.module';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    NavbarComponent,
    LayoutComponent,
    SidenavInnardsComponent,
    NavLinksComponent,
  ],
  providers: [SidenavService],
  exports: [LayoutComponent],
})
export class LayoutModule {}
