import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValorantAgentSkillInfoComponent } from './valorant-agent-skill-info.component';

describe('ValorantAgentSkillInfoComponent', () => {
  let component: ValorantAgentSkillInfoComponent;
  let fixture: ComponentFixture<ValorantAgentSkillInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValorantAgentSkillInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValorantAgentSkillInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
