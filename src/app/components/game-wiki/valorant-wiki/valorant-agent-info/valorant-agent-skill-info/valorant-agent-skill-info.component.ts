import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ValorantAgentAbility, ValorantRole } from '../../../../../models/valorant.model';
import { ValorantSkillFrameComponent } from './valorant-skill-frame/valorant-skill-frame.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'valorant-agent-skill-info',
  imports: [CommonModule, ValorantSkillFrameComponent],
  templateUrl: './valorant-agent-skill-info.component.html',
  styleUrl: './valorant-agent-skill-info.component.scss'
})
export class ValorantAgentSkillInfoComponent implements OnChanges {
  @Input() skills!: ValorantAgentAbility[];
  @Input() role!: ValorantRole | null;
  @Input() agentDescription!: string | undefined;

  private selectedInfo: string = 'INFO';

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['agentDescription']) {
      this.selectedInfo = 'INFO';
    }
  }

  onSelectInfo(selectedInfo: string) {
    this.selectedInfo = selectedInfo;
  }

  getIsSelectedInfo(infoLabel: string) {
    return infoLabel == this.selectedInfo;
  }
}
