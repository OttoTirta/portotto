import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SudokuServiceService } from '../../../services/sudokuService/sudoku-service.service';
import { LoadingComponent } from "../../shared/loading/loading.component";


type cellIdx = {
  tableRowIdx: number,
  tableColIdx: number,
  boxRowIdx: number,
  boxColIdx: number
}

@Component({
  selector: 'app-sudoku',
  imports: [CommonModule, LoadingComponent],
  templateUrl: './sudoku.component.html',
  styleUrl: './sudoku.component.scss',
})
export class SudokuComponent {
  private sudokuSolution: number[][] = [];
  private timerInterval: any;
  private playTime: number = 0;

  sudokuTable!: any[][];
  activeCell: cellIdx = {
    tableRowIdx: -1,
    tableColIdx: -1,
    boxRowIdx: -1,
    boxColIdx: -1
  }

  isStartGame: boolean = false;
  isHasDuplicate: boolean = false;
  isHasEmptyCell: boolean = true;
  hasSavedGame: boolean = false;
  hasMovement: boolean = false;

  isLoading: boolean = false;

  activeCellNeighbours!: cellIdx[] | null;

  sudokuButton = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'Delete','Reset'];

  constructor(
    private sudokuService: SudokuServiceService
  ) {
    this.hasSavedGame = sudokuService.hasSavedGame;
    this.hasMovement = this.hasSavedGame;
  }

  get isAnyActiveCell() {
    return this.activeCell.boxRowIdx !== -1;
  }

  get isWinGame() {
    return !this.isHasEmptyCell && !this.isHasDuplicate;
  }

  get formatedPlayTime() {
    return this.secondsToFormattedTime(this.playTime);
  }

  get bestTime() {
    return this.sudokuService.getBestTime();
  }

  get formattedBestTime() {
    return this.secondsToFormattedTime(this.bestTime);
  }

  secondsToFormattedTime(seconds: number) {
    const minutes = String(Math.floor(seconds / 60) % 60);
    const hour = Math.floor(seconds / 3600);
    const formattedHours = hour > 0 ? `${hour}:` : ''; 
    const formattedMinutes = minutes.length < 2?  minutes.padStart(2, '0') : minutes;
    const formattedSeconds = String(seconds % 60).padStart(2, '0');
  
    return `${formattedHours}${formattedMinutes}:${formattedSeconds}`;
  }

  sudokuCell(cellIndex: cellIdx) {
    return this.sudokuTable[cellIndex.tableRowIdx][cellIndex.tableColIdx][cellIndex.boxRowIdx][cellIndex.boxColIdx];
  }

  resetTable() {
    if(this.isLoading) return
    this.stopTimer();

    this.sudokuService.removeSudokuProgress();

    this.hasMovement = false;
    this.isStartGame = true;
    this.playTime = 0;
    this.isHasEmptyCell = true;
    this.isHasDuplicate = false;

    if(this.isAnyActiveCell){
      this.turnOffActiveCellNeighboursHighlight();
      this.deactiveCell();
    }
    this.resetActiveCell();
    this.activeCellNeighbours = null;

    const defaultSudokuCell = {
      val: 0,
      isActive: false,
      isLocked: false,
      isNeighbour: false
    };

    const defaultRow = [structuredClone(defaultSudokuCell), structuredClone(defaultSudokuCell), structuredClone(defaultSudokuCell)];
    const defaultBox = [structuredClone(defaultRow), structuredClone(defaultRow), structuredClone(defaultRow)];

    this.sudokuTable = [
      [structuredClone(defaultBox), structuredClone(defaultBox), structuredClone(defaultBox)],
      [structuredClone(defaultBox), structuredClone(defaultBox), structuredClone(defaultBox)],
      [structuredClone(defaultBox), structuredClone(defaultBox), structuredClone(defaultBox)],
    ];

    this.generateRandomNumber();
  }

  onClickCell(tableRowIdx: number, tableColIdx: number, boxRowIdx: number, boxColIdx: number) {
    const clickedCellIndex: cellIdx = {
      tableRowIdx: tableRowIdx,
      tableColIdx: tableColIdx,
      boxRowIdx: boxRowIdx,
      boxColIdx: boxColIdx
    }

    if(!this.sudokuCell(clickedCellIndex).isLocked) {
      this.turnOffActiveCellNeighboursHighlight();
      this.activeCellNeighbours = null;
  
      if(JSON.stringify(clickedCellIndex) !== JSON.stringify(this.activeCell)) {
        if(this.isAnyActiveCell) {
          this.deactiveCell();
        }
        this.activeCell = clickedCellIndex;
        this.sudokuCell(clickedCellIndex).isActive = true;
        this.activeCellNeighbours = this.getCellNeighbours(this.activeCell);
        this.turnOnActiveCellNeighboursHighlight();
      } else {
        this.deactiveCell();
        this.resetActiveCell();
      }
    }
    if(this.hasMovement) this.saveProgress();
  }

  resetActiveCell() {
    this.activeCell = {
      tableRowIdx: -1,
      tableColIdx: -1,
      boxRowIdx: -1,
      boxColIdx: -1
    }
  }

  onClickActionButton(action: any) {
    if(action == 'Reset') {
      this.resetTable();
    } else {
      this.hasMovement = true;
      this.setCellValue(this.activeCell, action == 'Delete' ? 0 : action);
      this.saveProgress();
      this.checkWinGame();
    }
  }

  saveProgress() {
    const savingData = {
      sudokuGrid: this.sudokuTable,
      activeCell: this.activeCell,
      activeCellNeighbours: this.activeCellNeighbours
    }
    this.sudokuService.saveSudokuProgress(savingData);
  }

  deactiveCell() {
    this.sudokuCell(this.activeCell).isActive = false;
  }

  setCellValue(cellIndex: cellIdx, value: number, isLocked?: boolean) {
    this.sudokuCell(cellIndex).val = value;
    if(isLocked !== undefined) {
      this.sudokuCell(cellIndex).isLocked = isLocked;
    }
  }

  getCellNeighbours(targetCell: cellIdx) {
    const neighboursIdx: cellIdx[] = [];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // Column
        const colNeigh: cellIdx = {
          tableRowIdx: targetCell.tableRowIdx,
          boxRowIdx: targetCell.boxRowIdx,
          tableColIdx: i,
          boxColIdx: j
        }
        if(
          !(this.isSameCell(colNeigh, targetCell) ||
          (colNeigh.tableColIdx == targetCell.tableColIdx && colNeigh.tableRowIdx == targetCell.tableRowIdx))
        ) {
          neighboursIdx.push(colNeigh);
        }

        // Row
        const rowNeigh: cellIdx = {
          tableRowIdx: i,
          boxRowIdx: j,
          tableColIdx: targetCell.tableColIdx,
          boxColIdx: targetCell.boxColIdx
        }
        if(
          !(this.isSameCell(rowNeigh, targetCell) ||
          (rowNeigh.tableColIdx == targetCell.tableColIdx && rowNeigh.tableRowIdx == targetCell.tableRowIdx))
        ) {
          neighboursIdx.push(rowNeigh);
        }

        //Box
        const boxNeigh: cellIdx = {
          tableRowIdx: targetCell.tableRowIdx,
          boxRowIdx: i,
          tableColIdx: targetCell.tableColIdx,
          boxColIdx: j
        }
        if(!this.isSameCell(boxNeigh, targetCell)) {
          neighboursIdx.push(boxNeigh);
        }
      }
    }
    return neighboursIdx;
  }

  isSameCell(cellA: cellIdx, cellB: cellIdx) {
    return (
      cellA.boxColIdx == cellB.boxColIdx &&
      cellA.boxRowIdx == cellB.boxRowIdx &&
      cellA.tableColIdx == cellB.tableColIdx &&
      cellA.tableRowIdx == cellB.tableRowIdx
    )
  }

  turnOnActiveCellNeighboursHighlight() {
    if(this.activeCellNeighbours != null) {
      this.activeCellNeighbours?.forEach((neighbour) => {
        this.sudokuCell(neighbour).isNeighbour = true;
      });
    }
  }

  turnOffActiveCellNeighboursHighlight() {
    if(this.activeCellNeighbours != null) {
      this.activeCellNeighbours?.forEach((neighbour) => {
        this.sudokuCell(neighbour).isNeighbour = false;
      });
    }
  }

  hasDuplicateNeighbour(targetCellIdx: cellIdx) {
    const targetCell = this.sudokuCell(targetCellIdx);
    
    return this.getCellNeighbours(targetCellIdx)?.some((neigbour) => {
      const neighbourCell = this.sudokuCell(neigbour);
      if (neighbourCell.val == 0) this.isHasEmptyCell = true;
      
      return neighbourCell.val != 0 && targetCell.val == neighbourCell.val;
    })
  }

  checkWinGame() {
    for (let tableColIdx = 0; tableColIdx < 3; tableColIdx++) {
      for (let tableRowIdx = 0; tableRowIdx < 3; tableRowIdx++) {
        for (let boxColIdx = 0; boxColIdx < 3; boxColIdx++) {
          for (let boxRowIdx = 0; boxRowIdx < 3; boxRowIdx++) {
            const currentCell: cellIdx = {
              boxColIdx: boxColIdx,
              boxRowIdx: boxRowIdx,
              tableColIdx: tableColIdx,
              tableRowIdx: tableRowIdx
            }
            if (this.sudokuCell(currentCell).val == 0) {
              this.isHasEmptyCell = true;
              return;
            } else if (this.hasDuplicateNeighbour(currentCell)) {
              this.isHasDuplicate = true;
              return;
            }
          }
        }
      }
    }

    this.isHasEmptyCell = false;
    this.isHasDuplicate = false;
    this.stopTimer();
    if(this.bestTime > this.playTime || this.bestTime == 0) {
      this.sudokuService.saveBestTime(this.playTime);
    }
    this.sudokuService.removeSudokuProgress();
  }

  generateRandomNumber() {
    this.isLoading = true;
    this.sudokuService.getSudokuGrid().subscribe({
      next: (res) => {
        const responseSudoku = res.newboard.grids[0].value;
        this.sudokuSolution = res.newboard.grids[0].solution;
        this.fillSudokuTable(responseSudoku);
        this.isLoading = false;
        this.startTimer();
      },
      error: (err) => {
        this.isLoading = false;
      }
    })
  }

  fillSudokuTable(sudokuGrid: number[][]) {
    for (let tableColIdx = 0; tableColIdx < 3; tableColIdx++) {
      for (let tableRowIdx = 0; tableRowIdx < 3; tableRowIdx++) {
        for (let boxColIdx = 0; boxColIdx < 3; boxColIdx++) {
          for (let boxRowIdx = 0; boxRowIdx < 3; boxRowIdx++) {
            const resCol = (3*tableColIdx) + boxColIdx;
            const resRow = (3*tableRowIdx) + boxRowIdx;
            const currentCell = this.sudokuCell({
              boxColIdx: boxColIdx,
              boxRowIdx: boxRowIdx,
              tableColIdx: tableColIdx,
              tableRowIdx: tableRowIdx
            })
            currentCell.val = sudokuGrid[resCol][resRow];
            currentCell.isLocked = currentCell.val != 0;
          }
        }
      }
    }
  }

  getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min)
  }

  keyboardEventListener(keyPressed: KeyboardEvent) {
    switch(true) {
      case(keyPressed.code.includes('Digit') && this.isAnyActiveCell):
        this.onClickActionButton(keyPressed.key);
        break;
      case(keyPressed.code == 'Backspace' && this.isAnyActiveCell):
        this.onClickActionButton(0);
        break;
      case(keyPressed.code == 'Escape' && this.isAnyActiveCell):
        this.turnOffActiveCellNeighboursHighlight();
        this.deactiveCell();
        this.resetActiveCell();
        this.activeCellNeighbours = null;
        break;
      case(keyPressed.code == 'KeyR'):
        this.resetTable();
        break;
      // Cheat
      case(keyPressed.code == 'KeyJ'):
        this.sudokuSolution[0][0] = 0;
        this.fillSudokuTable(this.sudokuSolution);
        break;
    }
  }

  startTimer() {
    this.timerInterval = setInterval(() => {
      this.playTime++;
      if(this.hasMovement) {
        this.sudokuService.saveTimer(this.playTime);
      }
    }, 1000);
  }

  stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  continueSavedGame() {
    this.isStartGame = true;
    this.playTime = this.sudokuService.getTimer();

    const savedData = this.sudokuService.getSavedSudokuProgress();
    
    this.sudokuTable = savedData.sudokuGrid;
    this.activeCell = savedData.activeCell;
    this.activeCellNeighbours = savedData.activeCellNeighbours;

    this.startTimer();
  }
}
