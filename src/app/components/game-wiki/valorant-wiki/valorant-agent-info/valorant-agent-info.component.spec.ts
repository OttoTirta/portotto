import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValorantAgentInfoComponent } from './valorant-agent-info.component';

describe('ValorantAgentInfoComponent', () => {
  let component: ValorantAgentInfoComponent;
  let fixture: ComponentFixture<ValorantAgentInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValorantAgentInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValorantAgentInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
