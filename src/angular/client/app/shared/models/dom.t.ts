export interface ScrollEvent extends UIEvent {
  target: ScrollEventTarget;
}
export interface ScrollEventTarget extends EventTarget {
  readonly scrollTop: number;
  readonly scrollHeight: number;
  readonly offsetHeight: number;
}
