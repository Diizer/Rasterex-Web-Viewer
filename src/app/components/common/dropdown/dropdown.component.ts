import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'rx-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  host: {
    '(document:click)': 'handleClickOutside($event)',
    '(document:keydown)': 'handleKeyboardEvents($event)'
  }
})
export class DropdownComponent implements OnInit {
  @Input() options: Array<any> = [];
  @Input() value: any;
  @Input() dropPosition: 'bottom' | 'top' = 'bottom';
  @Input() align: 'left' | 'right' = 'left';
  @Input() disabled: boolean = false;
  @Input() transparent: boolean = true;
  @Input() displayField: 'value' | 'label' = 'label';
  @Input() placeholder: string = "Select...";
  @Input() type: 'default' | 'three-dots' = 'default';
  @Output('valueChange') onValueChange = new EventEmitter<any>();

  public opened: boolean = false;
  private currentIndex = -1;

  constructor(private elem: ElementRef) { }

  ngOnInit(): void {
  }

  handleSelect(item: any) {
    this.value = item;
    this.onValueChange.emit(this.value);
    this.opened = false;
  }

  handleClear(): void {
    if (this.value) {
      this.value = undefined;
      this.onValueChange.emit(this.value);
    }
  }

  handleDropdown(): void {
    if (this.disabled) return;
    this.opened = !this.opened;
  }

  /* Listeners */
  handleClickOutside(event: any) {
    if (!this.opened) return;
    const clickedInside = this.elem.nativeElement.contains(event.target);
    if (!clickedInside) {
        this.opened = false;
    }
  }

  handleKeyboardEvents($event: KeyboardEvent) {
    if (this.opened) {
        $event.preventDefault();
    } else {
        return;
    }

    if ($event.code === 'ArrowUp') {
        if (this.currentIndex < 0) {
            this.currentIndex = 0;
        } else if (this.currentIndex > 0) {
            this.currentIndex--;
        }
        this.elem.nativeElement.querySelectorAll('li').item(this.currentIndex).focus();
    } else if ($event.code === 'ArrowDown') {
        if (this.currentIndex < 0) {
            this.currentIndex = 0;
        } else if (this.currentIndex < this.options.length-1) {
            this.currentIndex++;
        }
        this.elem.nativeElement.querySelectorAll('li').item(this.currentIndex).focus();
    } else if (($event.code === 'Enter' || $event.code === 'NumpadEnter') && this.currentIndex >= 0) {
        this.selectByIndex(this.currentIndex);
    } else if ($event.code === 'Escape') {
        this.opened = false;
    }
  }

  private selectByIndex(i: number) {
    let value = this.options[i];
    this.handleSelect(value);
  }

}
