import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class SidenavService {
  private readonly _isSidenavOpen: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get isSidenavOpen$(): Observable<boolean> {
    return this._isSidenavOpen.asObservable();
  }

  get isSidenavOpen(): boolean {
    return this._isSidenavOpen.value;
  }

  set isSidenavOpen(state: boolean) {
    this._isSidenavOpen.next(state);
  }

  constructor(@Inject(DOCUMENT) private readonly doc: Document) {}

  toggleSidenav(): void {
    if (this.isSidenavOpen) {
      this.closeSidenav();
    } else {
      this.openSidenav();
    }
  }

  closeSidenav(): void {
    this.isSidenavOpen = false;
  }

  openSidenav(): void {
    this.isSidenavOpen = true;
  }
}
