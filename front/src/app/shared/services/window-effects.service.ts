import { Injectable } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WindowEffectsService {
  constructor(private readonly mediaObserver: MediaObserver) {}

  resizeWindow$(): Observable<any> {
    return this.mediaObserver.asObservable();
  }
}
