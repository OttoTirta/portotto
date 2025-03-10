import { Component } from '@angular/core';
import { ValorantAgentsComponent } from './valorant-agents/valorant-agents.component';
import { CommonModule } from '@angular/common';
import { ValorantHeaderComponent } from './valorant-header/valorant-header.component';
import { ValorantWeaponsComponent } from './valorant-weapons/valorant-weapons.component';

@Component({
  selector: 'app-valorant-wiki',
  imports: [CommonModule, ValorantAgentsComponent, ValorantHeaderComponent, ValorantWeaponsComponent],
  templateUrl: './valorant-wiki.component.html',
  styleUrl: './valorant-wiki.component.scss'
})
export class ValorantWikiComponent {
  private selectedHeaderMenu: string = 'agent';

  onSelectedHeaderMenu(selectedHeaderMenu: string) {
    this.selectedHeaderMenu = selectedHeaderMenu;
  }

  isSelectedMenu(menu: string) {
    return this.selectedHeaderMenu == menu;
  }
}
