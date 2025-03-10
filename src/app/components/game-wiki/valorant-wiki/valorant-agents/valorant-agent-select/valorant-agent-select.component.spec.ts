import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValorantAgentSelectComponent } from './valorant-agent-select.component';

describe('ValorantAgentSelectComponent', () => {
  let component: ValorantAgentSelectComponent;
  let fixture: ComponentFixture<ValorantAgentSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValorantAgentSelectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValorantAgentSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
