import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ValorantAgentSelectComponent } from './valorant-agent-select/valorant-agent-select.component';
import { ValorantAgentInfoComponent } from './valorant-agent-info/valorant-agent-info.component';
import { ValorantAgent } from '../../../../models/valorant.model';

@Component({
  selector: 'valorant-agents',
  imports: [CommonModule, ValorantAgentSelectComponent, ValorantAgentInfoComponent],
  templateUrl: './valorant-agents.component.html',
  styleUrl: './valorant-agents.component.scss'
})
export class ValorantAgentsComponent {
  selectedValorantAgent: ValorantAgent | null = null;

  onSelectAgent(agent: ValorantAgent) {
    this.selectedValorantAgent = agent;
  }
}
