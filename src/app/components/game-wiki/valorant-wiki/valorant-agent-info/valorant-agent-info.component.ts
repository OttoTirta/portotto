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
    filteredSkills.sort((a, b) => a.slot == "Passive" ? 1 : a.slot.localeCompare(b.slot));
    return filteredSkills;
  }
}
