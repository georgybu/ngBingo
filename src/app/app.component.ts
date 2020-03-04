import {Component, OnInit} from '@angular/core';
import {StoreService} from './store.service';

@Component({
  selector: 'app-root',
  template: `
      <app-board></app-board>
      <app-board></app-board>
      <app-board></app-board>

      <app-board></app-board>
      <app-board></app-board>
      <app-board></app-board>

      <hr>
      <button (click)="onNextNumber($event)">next number</button>
      <pre>{{ numbers | json }}</pre>
  `,
  styles: []
})
export class AppComponent implements OnInit {
  public numbers = [];

  constructor(public store: StoreService) {
  }

  ngOnInit(): void {
    this.store.init();
    this.store.numbers$.subscribe((e) => this.numbers.push(e));
  }

  onNextNumber($event: MouseEvent) {
    this.store.nextNumber();
  }
}
