import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

type dropdownMenu = {
  id: string,
  val: string,
  path: string
}

@Component({
  selector: 'dropdown',
  imports: [CommonModule],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss'
})
export class DropdownComponent {
  @Input() dropdownTitle: string = '';
  @Input() dropdownData!: dropdownMenu[];

  @Output() selectedMenu = new EventEmitter();

  showDropdown: boolean = false;

  toogleDropdown(show: boolean) {
    this.showDropdown = show;
  }

  onClickDropdownMenu(menu: string) {
    this.selectedMenu.emit(menu);
  }
}
