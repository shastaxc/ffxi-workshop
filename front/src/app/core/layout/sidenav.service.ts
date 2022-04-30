import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class SidenavService {
  private _isSidenavOpen: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get isSidenavOpen$(): Observable<boolean> {
    return this._isSidenavOpen.asObservable();
  }

  get isSidenavOpen(): boolean {
    return this._isSidenavOpen.value;
  }

  set isSidenavOpen(state: boolean) {
    this._isSidenavOpen.next(state);
  }

  constructor(@Inject(DOCUMENT) private doc: Document) {}

  toggleSidenav(): void {
    this.isSidenavOpen ? this.closeSidenav() : this.openSidenav();
  }

  closeSidenav(): void {
    this.isSidenavOpen = false;
  }

  openSidenav(): void {
    this.isSidenavOpen = true;
  }
}
