import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game.component';
import { RouterModule, Routes } from '@angular/router';
import { CardComponent } from './components/card/card.component';
import {MatCardModule} from '@angular/material/card';
import { ButtonComponent } from 'src/app/shared/button/button.component';
import {MatSelectModule} from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

const routes: Routes = [
  {
    path: '',
    component: GameComponent
  }
]

@NgModule({
  declarations: [
    GameComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    ButtonComponent,
    MatSelectModule,
    MatFormFieldModule
  ]
})
export class GameModule { }
