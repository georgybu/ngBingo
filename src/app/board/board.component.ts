import {Component, OnInit} from '@angular/core';
import {StoreService} from '../store.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  public board = [];

  private winNumbers = [];
  private numbers: number[] = [];

  constructor(private store: StoreService) {
  }

  ngOnInit() {
    this.generateBoard();
    this.store.numbers$.subscribe((num) => {
      this.markHas(num);
      this.numbers.push(num);
      this.checkWin(this.numbers);
    });
  }

  private generateBoard() {
    const items = [];
    for (let i = 1; i < 52; i++) {
      items.push(i);
    }

    for (let i = 0; i < 5; i++) {
      const row = [];
      for (let j = 0; j < 5; j++) {
        const item = items[Math.floor(Math.random() * items.length)];
        const itemIndex = items.indexOf(item);
        items.splice(itemIndex, 1);
        row.push({number: item, has: false, win: false});
      }
      this.board.push(row);

      this.winNumbers.push({direction: 'row', position: i, numbers: row.map(e => e.number)});
    }

    for (let i = 0; i < 5; i++) {
      const col = [];
      for (let j = 0; j < 5; j++) {
        col.push(this.board[j][i]);
      }

      this.winNumbers.push({direction: 'col', position: i, numbers: col.map(e => e.number)});
    }

    const d1 = [];
    const d2 = [];
    for (let i = 0; i < 5; i++) {
      d1.push(this.board[i][i]);
      d2.push(this.board[i][4 - i]);
    }

    this.winNumbers.push({direction: 'd1', position: 0, numbers: d1.map(e => e.number)});
    this.winNumbers.push({direction: 'd2', position: 0, numbers: d2.map(e => e.number)});

    console.log(
      this.board,
      this.winNumbers
    );
  };

  private checkBoard(board: number[], numbers: number[]) {

  }

  private markHas(num: number) {
    this.board.forEach(line => {
      line.forEach((e) => {
        if (e.number === num) {
          e.has = true;
        }
      });
    });
  }

  private checkWin(numbers: number[]) {
    const winRes = [];

    this.winNumbers.forEach((e) => {
      const exist = e.numbers.reduce((acc, curr) => {
        return acc && numbers.indexOf(curr) > -1;
      }, true);

      if (exist) {
        winRes.push(e);
      }
    });

    if (winRes.length) {
      console.log('checkWin', winRes);
      winRes.forEach(e => {
        if (e.direction === 'd1') {
          for (let i = 0; i < 5; i++) {
            this.board[i][i].win = true;
          }
        }

        if (e.direction === 'd2') {
          for (let i = 0; i < 5; i++) {
            this.board[i][4 - i].win = true;
          }
        }

        if (e.direction === 'col') {
          for (let i = 0; i < 5; i++) {
            this.board[i][e.position].win = true;
          }
        }

        if (e.direction === 'row') {
          for (let i = 0; i < 5; i++) {
            this.board[e.position][i].win = true;
          }
        }
      })
    }

  }
}
