import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  public numbers$: Subject<number> = new Subject();
  private numbers = [];

  constructor() {
  }

  public init() {
    this.numbers = [];
    for (let i = 1; i < 52; i++) {
      this.numbers.push(i);
    }
  }

  public nextNumber() {
    this.numbers$.next(this.getNumber());
  }

  private getNumber() {
    const item = this.numbers[Math.floor(Math.random() * this.numbers.length)];
    const itemIndex = this.numbers.indexOf(item);
    this.numbers.splice(itemIndex, 1);
    return item;
  }
}
