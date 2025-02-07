import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DropdownComponent } from '../shared/dropdown/dropdown.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule, DropdownComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(private router: Router) {}

  navbarMenu = [
    {
      id: 'navbarMenuHome',
      val: 'Home',
      path: 'home'
    },
    {
      id: 'navbarMenuGames',
      val: 'Games',
      path: 'games',
      subMenu: [
        {
          id: 'navbarMenuGamesSudoku',
          val: 'Sudoku',
          path: 'sudoku',
        },
        {
          id: 'navbarMenuGamesMinesweeper',
          val: 'Minesweeper',
          path: 'minesweeper',
        },
      ]
    },
  ]

  onClickNavbarMenu(menu: string) {
    this.router.navigate([menu]);
  }
}
