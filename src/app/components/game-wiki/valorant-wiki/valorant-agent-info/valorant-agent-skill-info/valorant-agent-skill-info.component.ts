import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
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

  @Output() onSelectAgentInfo = new EventEmitter();

  private selectedInfo: string = 'INFO';

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['agentDescription']) {
      this.selectedInfo = 'INFO';
    }
  }

  onSelectInfo(selectedInfo: string) {
    this.selectedInfo = selectedInfo;
    this.onSelectAgentInfo.emit(selectedInfo);
  }

  getIsSelectedInfo(infoLabel: string) {
    return infoLabel == this.selectedInfo;
  }

  private get selectedSkill() {
    return this.skills.find((skill) => skill.slot == this.selectedInfo) ?? this.skills[0];
  }
  
  get informationLabel() {
    if(this.getIsSelectedInfo('INFO')) {
      return this.role?.displayName;
    } else {
      return this.selectedSkill.displayName;
    }
  }

  get informationDescription() {
    if(this.getIsSelectedInfo('INFO')) {
      return this.role?.description;
    }
    else {
      return this.selectedSkill.description;
    }
  }
}
