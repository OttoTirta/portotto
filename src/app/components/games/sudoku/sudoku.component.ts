import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SudokuServiceService } from '../../../services/sudokuService/sudoku-service.service';


type cellIdx = {
  tableRowIdx: number,
  tableColIdx: number,
  boxRowIdx: number,
  boxColIdx: number
}

@Component({
  selector: 'app-sudoku',
  imports: [CommonModule],
  templateUrl: './sudoku.component.html',
  styleUrl: './sudoku.component.scss',
})
export class SudokuComponent {
  sudokuTable!: any[][];
  activeCell: cellIdx = {
    tableRowIdx: -1,
    tableColIdx: -1,
    boxRowIdx: -1,
    boxColIdx: -1
  }

  isHasDuplicate: boolean = false;
  isHasEmptyCell: boolean = true;

  isLoading: boolean = false;

  activeCellNeighbours: cellIdx[] | null = null;

  sudokuButton = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'Delete','Reset'];

  constructor(private sudokuService: SudokuServiceService) {
    this.resetTable();
  }

  get isAnyActiveCell() {
    return this.activeCell.boxRowIdx !== -1;
  }

  sudokuCell(cellIndex: cellIdx) {
    return this.sudokuTable[cellIndex.tableRowIdx][cellIndex.tableColIdx][cellIndex.boxRowIdx][cellIndex.boxColIdx];
  }

  resetTable() {
    this.isHasEmptyCell = true;
    this.isHasDuplicate = false;
    this.resetActiveCell();
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
      this.setCellValue(this.activeCell, action == 'Delete' ? 0 : action);
      this.checkWinGame();
    }
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
  }

  generateRandomNumber() {
    this.isLoading = true;
    this.sudokuService.getSudokuGrid().subscribe({
      next: (res) => {
        const responseSudoku = res.newboard.grids[0].value;
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
                currentCell.val = responseSudoku[resCol][resRow];
                currentCell.isLocked = currentCell.val != 0;
              }
            }
          }
        }
        this.isLoading = false;
      }
    })
  }

  getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min)
  }

  keyboardEventListener(keyPressed: KeyboardEvent) {
    console.log(keyPressed);
    
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
    }
  }
}
