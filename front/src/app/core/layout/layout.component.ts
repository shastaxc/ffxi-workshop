import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import { slideInAnimation } from '@/shared/constants/animations.const';
import { SidenavService } from './sidenav.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  animations: [slideInAnimation],
})
export class LayoutComponent implements AfterViewInit {
  @ViewChild('navbar')
  navbar!: ElementRef;
  @ViewChild('sidenav')
  sidenav!: MatSidenav;
  @ViewChild('sidenavContainer', { read: ElementRef })
  sidenavContainer!: ElementRef;

  headerHeight!: number;

  get navbarEl(): HTMLDivElement {
    return this.navbar.nativeElement as HTMLDivElement;
  }

  get sidenavContainerEl(): any {
    return this.sidenavContainer.nativeElement;
  }

  constructor(private sidenavService: SidenavService) {}

  ngAfterViewInit(): void {
    // Get header height
    of('')
      .pipe(
        delay(0), // Avoiding ExpressionChangedAfterItHasBeenCheckedError
        map(() => this.navbarEl.offsetHeight)
      )
      .subscribe((height: any) => {
        this.headerHeight = height;
        this.sidenavContainerEl.style.top = height + 'px';
      });

    // Open or close sidenav based on state in the sidenav service
    this.sidenavService.isSidenavOpen$.subscribe((state: boolean) => {
      state ? this.sidenav.open() : this.sidenav.close();
    });
  }

  toggleSidenav(): void {
    this.sidenavService.toggleSidenav();
  }

  closeSidenav(): void {
    this.sidenavService.closeSidenav();
  }

  // Also recalculate header height if window is resized
  @HostListener('window:resize', ['$event'])
  private onResize(): void {
    this.headerHeight = this.navbarEl.offsetHeight;
    this.sidenavContainerEl.style.top = this.headerHeight + 'px';
  }

  prepareRoute(outlet: RouterOutlet): string {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
