import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { GamesComponent } from './components/games/games.component';
import { SudokuComponent } from './components/games/sudoku/sudoku.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'games',
    component: GamesComponent,
    children: [
      {
        path: 'sudoku',
        component: SudokuComponent,
      },
    ],
  },
];
