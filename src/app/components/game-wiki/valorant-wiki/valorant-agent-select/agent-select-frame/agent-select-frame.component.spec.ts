import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentSelectFrameComponent } from './agent-select-frame.component';

describe('AgentSelectFrameComponent', () => {
  let component: AgentSelectFrameComponent;
  let fixture: ComponentFixture<AgentSelectFrameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgentSelectFrameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentSelectFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
