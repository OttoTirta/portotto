import { TestBed } from '@angular/core/testing';

import { SudokuServiceService } from './sudoku-service.service';

describe('SudokuServiceService', () => {
  let service: SudokuServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SudokuServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
