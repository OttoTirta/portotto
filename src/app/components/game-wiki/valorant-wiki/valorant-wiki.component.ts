import { Component } from '@angular/core';
import { ValorantAgentSelectComponent } from './valorant-agent-select/valorant-agent-select.component';
import { ValorantAgent } from '../../../models/valorant.model';
import { ValorantAgentInfoComponent } from './valorant-agent-info/valorant-agent-info.component';

@Component({
  selector: 'app-valorant-wiki',
  imports: [ValorantAgentSelectComponent, ValorantAgentInfoComponent],
  templateUrl: './valorant-wiki.component.html',
  styleUrl: './valorant-wiki.component.scss'
})
export class ValorantWikiComponent {
  selectedValorantAgent: ValorantAgent | null = null;

  onSelectAgent(agent: ValorantAgent) {
    this.selectedValorantAgent = agent;
  }
}
