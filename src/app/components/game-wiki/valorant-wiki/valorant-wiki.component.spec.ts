import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValorantWikiComponent } from './valorant-wiki.component';

describe('ValorantWikiComponent', () => {
  let component: ValorantWikiComponent;
  let fixture: ComponentFixture<ValorantWikiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValorantWikiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValorantWikiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
