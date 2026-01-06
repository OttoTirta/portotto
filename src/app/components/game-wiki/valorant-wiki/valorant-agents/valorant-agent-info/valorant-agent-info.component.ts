import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ValorantAgent } from '../../../../../models/valorant.model';
import { CommonModule } from '@angular/common';
import { ValorantAgentSkillInfoComponent } from './valorant-agent-skill-info/valorant-agent-skill-info.component';
import { LoadingComponent } from '../../../../shared/loading/loading.component';

@Component({
  selector: 'valorant-agent-info',
  imports: [CommonModule, ValorantAgentSkillInfoComponent, LoadingComponent],
  templateUrl: './valorant-agent-info.component.html',
  styleUrl: './valorant-agent-info.component.scss'
})
export class ValorantAgentInfoComponent implements OnChanges {
  @Input() agent!: ValorantAgent;

  isBackgroundLoaded = false;
  isPortraitLoaded = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['agent']) {
      this.isBackgroundLoaded = false;
      this.isPortraitLoaded = false;
    }
  }

  onBackgroundLoad() {
    this.isBackgroundLoaded = true;
  }

  onPortraitLoad() {
    this.isPortraitLoaded = true;
  }

  get isAllImagesLoaded() {
    // If agent has no background (rare/model dependent), treat as loaded
    return this.isBackgroundLoaded && this.isPortraitLoaded;
  }

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
