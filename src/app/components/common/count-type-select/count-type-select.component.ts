import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'rx-count-type-select',
  templateUrl: './count-type-select.component.html',
  styleUrls: ['./count-type-select.component.scss'],
  standalone: false,
})
export class CountTypeSelectComponent {
  @Input() value = 0;
  @Output() valueChange: EventEmitter<number> = new EventEmitter<number>();

  onCountTypeChange(type: number): void {
    this.value = type;
    this.valueChange.emit(type);
  }
}
