import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScrollTopService {
  private scrollEvent = new Subject<number>();

  scrollEvent$ = this.scrollEvent.asObservable();

  scrollToTop() {
    this.scrollEvent.next(0);
  }

  scrollToComponent(index: number) {
    this.scrollEvent.next(index);
  }
}