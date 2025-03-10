import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValorantHeaderComponent } from './valorant-header.component';

describe('ValorantHeaderComponent', () => {
  let component: ValorantHeaderComponent;
  let fixture: ComponentFixture<ValorantHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValorantHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValorantHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
