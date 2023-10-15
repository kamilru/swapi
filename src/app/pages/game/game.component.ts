import { Component } from '@angular/core';
import { finalize } from 'rxjs';
import { SwapiService } from 'src/app/services/swapi.service';

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
  totalCounts: { people: number; starships: number; };
  selectedOption: string;
  gameStarted: boolean = false;
  waitingForCards: boolean;

  constructor(private swapiService: SwapiService){
    this.swapiService.getObjectsCount().subscribe({
      next: value => {
        this.totalCounts = {
          people: value.people,
          starships: value.starships
        }
      }
    })
  }

  generateRandomPersonId(): number {
    if(this.totalCounts) {
      return Math.floor(Math.random() * this.totalCounts?.people) + 1;
    } else  {
      return 1;
    }
  }

  generateRandomStarshipId(): number {
    if(this.totalCounts) {
    return Math.floor(Math.random() * this.totalCounts?.starships) + 1;
    } else  {
      return 1;
    }
  }

  onGameStart(): void {
    this.gameStarted = true;
    this.waitingForCards = true;
    this.swapiService.getPeopleCards(this.generateRandomPersonId(), this.generateRandomPersonId())
    .subscribe({
      next: value => {
        this.waitingForCards = false;
        this.leftCardData = value.firstPersonCard;
        this.rightCardData = value.secondPersonCard;

        if(this.leftCardData.mass !== 'unknown' && this.rightCardData.mass !== 'unknown') {
          if(Number(this.leftCardData.mass) > Number(this.rightCardData.mass)) {
            this.leftCardScore++;
          } else {
            this.rightCardScore++;
          }
        } else {
          this.onGameStart()
        }
      },
      error: err => {
        this.onGameStart();
      }
    })
  }

  resetGame(): void {
    this.gameStarted = false;
    this.leftCardData = null;
    this.rightCardData = null;
    this.waitingForCards = false;
    this.rightCardScore = 0;
    this.leftCardScore = 0;
  }
}
