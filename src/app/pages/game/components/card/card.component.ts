import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent {
  @Input() set score(value: number) {
    if(value) {
      this._score = value;
      this.isWinner = true;
    }
  }

  get score(): number {
    return this._score;
  }

  @Input() set waitingForCards(value: boolean) {
    this._waitingForCards = value;
    this.isWinner = false;
  }

  get waitingForCards(): boolean {
    return this._waitingForCards;
  }

  @Input() data: any;

  isWinner: boolean = false;
  private _score: number = 0;
  private _waitingForCards: boolean = false;
}
