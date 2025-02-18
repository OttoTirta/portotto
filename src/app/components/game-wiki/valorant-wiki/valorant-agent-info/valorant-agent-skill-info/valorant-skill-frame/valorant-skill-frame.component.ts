import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'valorant-skill-frame',
  imports: [CommonModule],
  templateUrl: './valorant-skill-frame.component.html',
  styleUrl: './valorant-skill-frame.component.scss'
})
export class ValorantSkillFrameComponent {
  @Input() skillIcon!: string;
  @Input() skillLabel!: string;
  @Input() isActive: boolean = false;

  get displayLabel() {
    switch (this.skillLabel) {
      case "Ability1":
        return 'C';
      case "Ability2":
        return 'Q';
      case "Grenade":
        return 'E';
      case "Ultimate":
        return 'X';
      default:
        return this.skillLabel;
    }
  }
}
