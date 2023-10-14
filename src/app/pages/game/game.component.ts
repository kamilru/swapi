import { Component } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {
  rightCardData: any;
  leftCardData: any;
  rightCardScore: number = 0;
  leftCardScore: number = 0;

  onGameStart(): void {
    
  }
}
