import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScrollService {
  private _scrollToBottom: boolean;
  constructor() {
    this.scrollToBottom = false;
  }

  get scrollToBottom(): boolean {
    return this._scrollToBottom;
  }

  set scrollToBottom(value: boolean) {
    this._scrollToBottom = value;
  }

  public isScrolledToBottom($event): void {
    if ($event && $event.target) {
      const scrolledOffset = Math.ceil(
        $event.target.offsetHeight + $event.target.scrollTop
      );

      console.log(`offsetHeight: ${$event.target.offsetHeight}`);
      console.log(`scrollTop: ${$event.target.scrollTop}`);
      console.log(`scrollHeight: ${$event.target.scrollHeight}`);
      console.log(`offsetHeight + scrollTop: ${scrolledOffset}`);

      if (scrolledOffset >= $event.target.scrollHeight) {
        this.scrollToBottom = true;
        return;
      }
    }

    this.scrollToBottom = false;
  }
}
