import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValorantWeaponsComponent } from './valorant-weapons.component';

describe('ValorantWeaponsComponent', () => {
  let component: ValorantWeaponsComponent;
  let fixture: ComponentFixture<ValorantWeaponsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValorantWeaponsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValorantWeaponsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
