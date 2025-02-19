import { Component, Input } from '@angular/core';
import { ValorantAgent } from '../../../../models/valorant.model';
import { CommonModule } from '@angular/common';
import { ValorantAgentSkillInfoComponent } from './valorant-agent-skill-info/valorant-agent-skill-info.component';

@Component({
  selector: 'valorant-agent-info',
  imports: [CommonModule, ValorantAgentSkillInfoComponent],
  templateUrl: './valorant-agent-info.component.html',
  styleUrl: './valorant-agent-info.component.scss'
})
export class ValorantAgentInfoComponent {
  @Input() agent!: ValorantAgent;

  get shownAbilities() {
    const filteredSkills = this.agent.abilities.filter((skill) => skill.displayIcon != null);
    filteredSkills.sort((a, b) => this.getAbilitiesIndex(a.slot) - this.getAbilitiesIndex(b.slot));
    return filteredSkills;
  }

  private getAbilitiesIndex(abilitySlot: string) {
    switch (abilitySlot) {
      case "Grenade":
        return 1;
      case "Ability1":
        return 2;
      case "Ability2":
        return 3;
      case "Ultimate":
        return 4;
      case "Passive":
        return 5;
      default:
       return -1;
    }
  }
}
