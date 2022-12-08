import { Injectable } from '@angular/core';
import { ScrollEvent } from '@/models';

@Injectable({
  providedIn: 'root',
})
export class ScrollService {
  private _scrollToBottom: boolean;
  constructor() {
    this._scrollToBottom = false;
  }

  get scrollToBottom(): boolean {
    return this._scrollToBottom;
  }

  set scrollToBottom(value: boolean) {
    this._scrollToBottom = value;
  }

  public isScrolledToBottom(event: ScrollEvent): void {
    if (event && event.target) {
      const target = event.target;
      const scrolledOffset = Math.ceil(target.offsetHeight + target.scrollTop);

      console.log(`offsetHeight: ${target.offsetHeight}`);
      console.log(`scrollTop: ${target.scrollTop}`);
      console.log(`scrollHeight: ${target.scrollHeight}`);
      console.log(`offsetHeight + scrollTop: ${scrolledOffset}`);

      if (scrolledOffset >= target.scrollHeight) {
        this.scrollToBottom = true;
        return;
      }
    }

    this.scrollToBottom = false;
  }
}
