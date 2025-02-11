import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { secondsToFormattedTime } from '../../../utils/helpers';

type MineLocation = {
  x: number,
  y: number
}

type MinesweeperCell = {
  isMine: boolean,
  mineNeighbour: number,
  isOpen: boolean,
  isFlagged: boolean
}

@Component({
  selector: 'app-minesweeper',
  imports: [CommonModule],
  templateUrl: './minesweeper.component.html',
  styleUrl: './minesweeper.component.scss'
})
export class MinesweeperComponent { 
  private timerInterval: any;
  
  minesweeperWidth = 30;
  minesweeperHeight = 20;
  minesweeperBoard: MinesweeperCell[][] = [[]];
  mineLocations: MineLocation[] = [];
  mineAmount = 99;
  flagRemaining = this.mineAmount;
  playTime = 0;

  isFinishedGame: boolean = false;
  isStartedGame: boolean = false;

  wrongOpenLocation: MineLocation = {
    x: -1,
    y: -1,
  }

  constructor() {
    this.generateNewGame();
  }

  generateMine() {
    this.mineLocations = [];
    while (this.mineLocations.length < this.mineAmount) {
      const mineLoc: MineLocation = {
        x: this.getRandomInt(this.minesweeperWidth),
        y: this.getRandomInt(this.minesweeperHeight)
      };

      const isDuplicate = this.mineLocations.find((loc) => loc.x == mineLoc.x && loc.y == mineLoc.y);
      if(!isDuplicate) {
        this.mineLocations.push(mineLoc);
      }
    }
  }

  resetBoard() {
    this.minesweeperBoard = [];

    const minesweeperRow: MinesweeperCell[] = []; 
    for (let y = 0; y < this.minesweeperHeight; y++) {
      const boardCell: MinesweeperCell = {
        isMine: false,
        isOpen: false,
        mineNeighbour: 0,
        isFlagged: false
      };
      minesweeperRow.push(JSON.parse(JSON.stringify(boardCell))); 
    }
    
    for (let x = 0; x < this.minesweeperWidth; x++) {
      this.minesweeperBoard.push(JSON.parse(JSON.stringify(minesweeperRow)));
    }
  }

  insertMineToBoard() {
    this.mineLocations.forEach((loc) => {
      this.minesweeperBoard[loc.x][loc.y].isMine = true;
    })
  }

  generateNewGame() {
    this.finishGame();
    this.wrongOpenLocation = {
      x: -1,
      y: -1,
    }
    this.isFinishedGame = false;
    this.flagRemaining = this.mineAmount;
    this.playTime = 0;

    this.resetBoard();
    this.generateMine();
    this.insertMineToBoard();
  }

  onClickClosedCell(x: number, y: number){
    const clickedCell = this.minesweeperBoard[x][y];

    if(this.isFinishedGame || clickedCell.isFlagged) return;

    if(!this.isStartedGame) {
      this.isStartedGame = true;
      this.startTimer();
    }

    clickedCell.isOpen = true;
    if (clickedCell.isMine) {
      this.openUnflaggedMines();
      this.wrongOpenLocation = {
        x: x,
        y: y,
      }
      this.finishGame();
    } else {
      clickedCell.mineNeighbour = this.getNeighbourMineCount(x, y);

      if(clickedCell.mineNeighbour == 0) {
        this.openNeighbour(x, y);
      }
      if (this.isAllNotMineOpened) {
        this.finishGame();
      }
    }
  }

  openNeighbour(xCurr: number, yCurr: number) {
    const xStart = xCurr == 0 ? xCurr : xCurr-1;
    const xEnd = xCurr == this.minesweeperBoard.length - 1 ? xCurr : xCurr+1;
    const yStart = yCurr == 0 ? yCurr : yCurr-1;
    const yEnd = yCurr == this.minesweeperBoard[0].length - 1 ? yCurr : yCurr+1;

    for (let x = xStart; x < xEnd+1; x++) {
      for (let y = yStart; y < yEnd+1; y++) {
        if(!(x == xCurr && y == yCurr) && !this.minesweeperBoard[x][y].isOpen) {
          this.onClickClosedCell(x, y);
        }
      }
    }
  }

  get isAllNotMineOpened() {
    return this.minesweeperBoard.every((row) => {
      return row.every((cell) => {
        return cell.isOpen || cell.isMine;
      })
    })
  }

  onRightClickCell(event: MouseEvent, x: number, y: number) {
    event.preventDefault();

    if(this.isFinishedGame) return;

    const clickedCell = this.minesweeperBoard[x][y];
    clickedCell.isFlagged = !clickedCell.isFlagged;
    this.flagRemaining = clickedCell.isFlagged ? this.flagRemaining-1 : this.flagRemaining+1;

    if(!this.isStartedGame) {
      this.isStartedGame = true;
      this.startTimer();
    }
  }
  onClickNumberCell(xCurr: number, yCurr: number) {
    const xStart = xCurr == 0 ? xCurr : xCurr-1;
    const xEnd = xCurr == this.minesweeperBoard.length - 1 ? xCurr : xCurr+1;
    const yStart = yCurr == 0 ? yCurr : yCurr-1;
    const yEnd = yCurr == this.minesweeperBoard[0].length - 1 ? yCurr : yCurr+1;
    let flaggedNeighbourCount = 0;
    for (let x = xStart; x < xEnd+1; x++) {
      for (let y = yStart; y < yEnd+1; y++) {
        if(!(x == xCurr && y == yCurr) && this.minesweeperBoard[x][y].isFlagged) {
          flaggedNeighbourCount++;
        }
      }
    }

    if(flaggedNeighbourCount == this.minesweeperBoard[xCurr][yCurr].mineNeighbour) {
      this.openNeighbour(xCurr, yCurr);
    }
  }

  finishGame() {
    this.isFinishedGame = true;
    this.isStartedGame = false;
    this.endTimer();
  }

  openUnflaggedMines() {
    this.mineLocations.forEach((loc) => {
      if(!this.minesweeperBoard[loc.x][loc.y].isFlagged) {
        this.minesweeperBoard[loc.x][loc.y].isOpen = true;
      }
    })
  }

  get formattedPlayTime() {
    return secondsToFormattedTime(this.playTime);
  }

  getNeighbourMineCount(xCurr: number, yCurr: number) {
    const xStart = xCurr == 0 ? xCurr : xCurr-1;
    const xEnd = xCurr == this.minesweeperBoard.length - 1 ? xCurr : xCurr+1;
    const yStart = yCurr == 0 ? yCurr : yCurr-1;
    const yEnd = yCurr == this.minesweeperBoard[0].length - 1 ? yCurr : yCurr+1;

    let mineCount = 0;
    
    for (let x = xStart; x < xEnd+1; x++) {
      for (let y = yStart; y < yEnd+1; y++) {
        if(!(x == xCurr && y == yCurr) && this.minesweeperBoard[x][y].isMine) {
          mineCount++;
        }
      }
    }
    return mineCount;
  }

  startTimer() {
    this.timerInterval = setInterval(() => {
      this.playTime++;
    }, 1000);
  }

  endTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  getRandomInt(max: number, min: number = 0) {
    return Math.floor(Math.random() * max) + min;
  }
}
