import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { GamesComponent } from './components/games/games.component';
import { SudokuComponent } from './components/games/sudoku/sudoku.component';
import { MinesweeperComponent } from './components/games/minesweeper/minesweeper.component';
import { GameWikiComponent } from './components/game-wiki/game-wiki.component';
import { ValorantWikiComponent } from './components/game-wiki/valorant-wiki/valorant-wiki.component';

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
      {
        path: 'minesweeper',
        component: MinesweeperComponent,
      },
    ],
  },
  {
    path: 'game-wiki',
    component: GameWikiComponent,
    children: [
      {
        path: 'valorant',
        component: ValorantWikiComponent,
      },
    ],
  },
];
