import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameWikiComponent } from './game-wiki.component';

describe('GameWikiComponent', () => {
  let component: GameWikiComponent;
  let fixture: ComponentFixture<GameWikiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameWikiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameWikiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
