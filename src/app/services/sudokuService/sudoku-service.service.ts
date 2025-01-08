import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from '../localStorage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class SudokuServiceService {

  private sudokuLink = 'https://sudoku-api.vercel.app/api/dosuku';
  private timerKey = 'sudoku-timer';
  private sudokuProgressKey = 'sudoku-grid';
  private bestTimeKey = 'sudoku-best-time';
  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  get hasSavedGame() {
    return this.getSavedSudokuProgress() !== null;
  }

  getSudokuGrid() {
    return this.http.get<any>(this.sudokuLink);
  }

  saveBestTime(time: number) {
    this.localStorageService.setItem(this.bestTimeKey, time);
  }

  getBestTime() {
    return this.localStorageService.getItem(this.bestTimeKey) ?? 0;
  }

  saveTimer(time: number) {
    this.localStorageService.setItem(this.timerKey, time);
  }

  getTimer() {
    return this.localStorageService.getItem(this.timerKey);
  }

  saveSudokuProgress(grid: any) {
    this.localStorageService.setItem(this.sudokuProgressKey, grid);
  }

  getSavedSudokuProgress() {
    return this.localStorageService.getItem(this.sudokuProgressKey);
  }

  removeSudokuProgress() {
    this.localStorageService.removeItem(this.sudokuProgressKey);
  }
}
