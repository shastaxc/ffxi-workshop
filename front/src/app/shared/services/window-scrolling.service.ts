import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class WindowScrollingService {
  constructor(@Inject(DOCUMENT) private doc: Document) {}

  /**
   * Disable the scrolling of the main viewport.
   */
  disable(): void {
    this.getScrollContainer()?.classList.add('no-scroll');
  }

  /**
   * Re-enable the scrolling of the main viewport.
   */
  enable(): void {
    this.getScrollContainer()?.classList.remove('no-scroll');
  }

  getScrollContainer(): HTMLElement | null {
    return this.doc.querySelector('.mat-sidenav-content');
  }

  /**
   * Scroll to the top of the main viewport.
   */
  scrollToTop(): void {
    const opt: ScrollToOptions = { top: 0 };
    this.getScrollContainer()?.scrollTo(opt);
  }
}
