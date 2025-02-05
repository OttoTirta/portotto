import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  navbarMenu = [
    {
      id: 'navbarMenuHome',
      val: 'Home'
    },
    {
      id: 'navbarMenuGames',
      val: 'Games'
    },
  ]

  onClickNavbarMenu(menu: string) {
    console.log(menu);
    
  }
}
