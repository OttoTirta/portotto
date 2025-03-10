import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValorantWeaponTableComponent } from './valorant-weapon-table.component';

describe('ValorantWeaponTableComponent', () => {
  let component: ValorantWeaponTableComponent;
  let fixture: ComponentFixture<ValorantWeaponTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValorantWeaponTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValorantWeaponTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
