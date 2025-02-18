import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValorantSkillFrameComponent } from './valorant-skill-frame.component';

describe('ValorantSkillFrameComponent', () => {
  let component: ValorantSkillFrameComponent;
  let fixture: ComponentFixture<ValorantSkillFrameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValorantSkillFrameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValorantSkillFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
