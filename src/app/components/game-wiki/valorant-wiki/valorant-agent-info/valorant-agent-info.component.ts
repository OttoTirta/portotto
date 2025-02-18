import { Component, Input } from '@angular/core';
import { ValorantAgent } from '../../../../models/valorant.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'valorant-agent-info',
  imports: [CommonModule],
  templateUrl: './valorant-agent-info.component.html',
  styleUrl: './valorant-agent-info.component.scss'
})
export class ValorantAgentInfoComponent {
  @Input() agent: ValorantAgent | null = null;

}
