import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'valorant-header',
  imports: [CommonModule],
  templateUrl: './valorant-header.component.html',
  styleUrl: './valorant-header.component.scss'
})
export class ValorantHeaderComponent {
  @Output() onSelectMenu = new EventEmitter();
  isAgentSelected: boolean = true;
  isWeaponSelected: boolean = false;

  onClickWeapon() {
    this.isWeaponSelected = true;
    this.isAgentSelected = !this.isWeaponSelected;
    this.onSelectMenu.emit('weapon');
  }

  onClickAgent() {
    this.isAgentSelected = true;
    this.isWeaponSelected = !this.isAgentSelected;
    this.onSelectMenu.emit('agent');
  }
}
