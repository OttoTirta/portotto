import { Component, Input } from '@angular/core';
import { ValorantAgent } from '../../../../../models/valorant.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'agent-select-frame',
  imports: [CommonModule],
  templateUrl: './agent-select-frame.component.html',
  styleUrl: './agent-select-frame.component.scss'
})
export class AgentSelectFrameComponent {
  @Input() agent!: ValorantAgent;
  @Input() isSelected: boolean = false;
}
