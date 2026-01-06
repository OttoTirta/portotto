import { Component, EventEmitter, Output } from '@angular/core';
import { ValorantService } from '../../../../../services/valorantService/valorant.service';
import { CommonModule } from '@angular/common';
import { ValorantAgent, ValorantRole } from '../../../../../models/valorant.model';
import { AgentSelectFrameComponent } from './agent-select-frame/agent-select-frame.component';

@Component({
  selector: 'valorant-agent-select',
  imports: [CommonModule, AgentSelectFrameComponent],
  templateUrl: './valorant-agent-select.component.html',
  styleUrl: './valorant-agent-select.component.scss'
})
export class ValorantAgentSelectComponent {
  @Output() selectedAgentEmitter = new EventEmitter();

  agentsData: ValorantAgent[] = [];
  selectedAgentUuid: string = "";

  agentRoles: ValorantRole[] = [];
  selectedRoleUuid: string = "";

  constructor(private valorantService: ValorantService) {
    this.resetTable();
  }

  get filteredAgentsByRole(): ValorantAgent[] {
    if (this.selectedRoleUuid == '0') {
      return this.agentsData;
    } else {
      return this.agentsData.filter((agent) => agent.role?.uuid == this.selectedRoleUuid)
    }
  }

  resetTable() {
    this.agentsData = [];
    this.selectedAgentUuid= "";

    this.agentRoles = [];
    this.selectedRoleUuid = "";

    this.fetchAgents();
    this.fetchRoles();
  }

  fetchAgents() {
    this.valorantService.getValorantAgents().subscribe({
      next: (res) => {
        this.agentsData = res.data;
        this.agentsData.sort((a, b) => a.displayName.localeCompare(b.displayName));
      }
    })
  }

  fetchRoles() {
    this.valorantService.getValorantRoles().subscribe({
      next: (res) => {
        this.agentRoles = res;
        this.selectedRoleUuid = '0';
      }
    })
  }

  onSelectAgent(agent: ValorantAgent) {
    this.selectedAgentUuid = agent.uuid;
    this.selectedAgentEmitter.emit(agent);
  }

  onSelectRole(uuid: string) {
    this.selectedRoleUuid = uuid;
  }

  isSelectedRole(uuid: string) {
    return uuid == this.selectedRoleUuid;
  }

  isAgentSelected(uuid: string) {
    return uuid == this.selectedAgentUuid;
  }

  trackByAgentUuid(index: number, agent: ValorantAgent): string {
    return agent.uuid;
  }

  trackByRoleUuid(index: number, role: ValorantRole): string {
    return role.uuid;
  }
}
