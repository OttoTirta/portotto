import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SudokuServiceService {

  sudokuLink = 'https://sudoku-api.vercel.app/api/dosuku';
  constructor(private http: HttpClient) { }

  getSudokuGrid() {
    return this.http.get<any>(this.sudokuLink+`?query={newboard(limit:1){grids{value}}}`);
  }
}
