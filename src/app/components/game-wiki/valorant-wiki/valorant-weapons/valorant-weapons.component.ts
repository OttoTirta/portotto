import { Component } from '@angular/core';
import { ValorantService } from '../../../../services/valorantService/valorant.service';

@Component({
  selector: 'valorant-weapons',
  imports: [],
  templateUrl: './valorant-weapons.component.html',
  styleUrl: './valorant-weapons.component.scss'
})
export class ValorantWeaponsComponent {
  constructor(private valorantService: ValorantService) {
    valorantService.getWeapons().subscribe({
      next: (res) => {
        console.log(res);
        
      }
    })
  }
}
