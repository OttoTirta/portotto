import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValorantService {
  private valorantAPILink = "https://valorant-api.com/v1";
  private valoLink = {
    agents: this.valorantAPILink+'/agents?isPlayableCharacter=true'
  }
  

  constructor(
      private http: HttpClient
    ) { }

  getValorantAgents() {
    return this.http.get<any>(this.valoLink.agents);
  }

  getValorantRoles() {
    const roles = [
      {
        uuid: "0",
        displayName: "All Role",
        displayIcon: "assets/svg/all-roles.svg",
      },
      {
        uuid: "4ee40330-ecdd-4f2f-98a8-eb1243428373",
        displayName: "Controller",
        displayIcon: "https://media.valorant-api.com/agents/roles/4ee40330-ecdd-4f2f-98a8-eb1243428373/displayicon.png",
      },
      {
        uuid: "1b47567f-8f7b-444b-aae3-b0c634622d10",
        displayName: "Initiator",
        displayIcon: "https://media.valorant-api.com/agents/roles/1b47567f-8f7b-444b-aae3-b0c634622d10/displayicon.png",
      },
      {
        uuid: "5fc02f99-4091-4486-a531-98459a3e95e9",
        displayName: "Sentinel",
        displayIcon: "https://media.valorant-api.com/agents/roles/5fc02f99-4091-4486-a531-98459a3e95e9/displayicon.png",
      },
      {
        uuid: "dbe8757e-9e92-4ed4-b39f-9dfc589691d4",
        displayName: "Duelist",
        displayIcon: "https://media.valorant-api.com/agents/roles/dbe8757e-9e92-4ed4-b39f-9dfc589691d4/displayicon.png",
      },
    ];
    
    return of(roles);
  }
}
