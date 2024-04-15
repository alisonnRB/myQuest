import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScrollTopService {
  private scrollEvent = new Subject<void>();

  scrollEvent$ = this.scrollEvent.asObservable();

  scrollToTop() {
    this.scrollEvent.next();
  }
}