import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValorantAgentsComponent } from './valorant-agents.component';

describe('ValorantAgentsComponent', () => {
  let component: ValorantAgentsComponent;
  let fixture: ComponentFixture<ValorantAgentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValorantAgentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValorantAgentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
