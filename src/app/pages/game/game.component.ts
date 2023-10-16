import { Component } from '@angular/core';
import { PersonCardDto, StarshipCardDto } from 'src/app/models/swapi.model';
import { SwapiService } from 'src/app/services/swapi.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {
  rightCardData: PersonCardDto | StarshipCardDto | null;
  leftCardData: PersonCardDto | StarshipCardDto | null;
  rightCardScore: number = 0;
  leftCardScore: number = 0;
  totalCounts: { people: number; starships: number; };
  selectedGame: 'PEOPLE' |  'STARSHIPS' = 'PEOPLE';
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

  onPeopleGameStart(): void {
    this.gameStarted = true;
    this.waitingForCards = true;
    this.swapiService.getPeopleCards(this.generateRandomPersonId(), this.generateRandomPersonId())
    .subscribe({
      next: value => {
        this.waitingForCards = false;
        this.leftCardData = value.firstPersonCard;
        this.rightCardData = value.secondPersonCard;

        if( !Number.isNaN(this.leftCardData.mass) && !Number.isNaN(this.rightCardData.mass)) {
          if(this.leftCardData.mass >this.rightCardData.mass) {
            this.leftCardScore++;
          } else {
            this.rightCardScore++;
          }
        } else {
          this.onPeopleGameStart()
        }
      },
      error: err => {
        this.onPeopleGameStart();
      }
    })
  }

  onStarshipsGameStart(): void {
    this.gameStarted = true;
    this.waitingForCards = true;
    this.swapiService.getStarshipsCards(this.generateRandomStarshipId(), this.generateRandomStarshipId())
    .subscribe({
      next: value => {
        this.waitingForCards = false;
        this.leftCardData = value.firstStarshipCard;
        this.rightCardData = value.secondStarshipCard;

        if(!Number.isNaN(this.leftCardData.crew) && !Number.isNaN(this.rightCardData.crew)) {
          if(this.leftCardData.crew > this.rightCardData.crew) {
            this.leftCardScore++;
          } else {
            this.rightCardScore++;
          }
        } else {
          this.onStarshipsGameStart()
        }
      },
      error: err => {
        this.onStarshipsGameStart();
      }
    })
  }

  onGameChange(value: any): void {
    this.resetGameData();
    this.chooseGame(value);
   }

   chooseGame(value: string): void {
    if(value === 'PEOPLE') {
      this.onPeopleGameStart();
    } else {
      this.onStarshipsGameStart();
    }
   }

   resetGameData(): void {
    this.leftCardData = null;
    this.rightCardData = null;
    this.waitingForCards = false;
    this.rightCardScore = 0;
    this.leftCardScore = 0;
   }

  resetGame(): void {
    this.gameStarted = false;
    this.resetGameData();
  }
}
