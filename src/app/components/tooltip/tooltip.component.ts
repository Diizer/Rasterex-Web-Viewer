import { Component, ElementRef, OnInit } from '@angular/core';
import { TooltipService } from './tooltip.service';

@Component({
    selector: 'tooltip',
    templateUrl: './tooltip.component.html',
    styleUrls: ['./tooltip.component.scss'],
    standalone: false
})
export class TooltipComponent implements OnInit {
  showTooltipDelay: number = 200;
  duration: number = 3000;
  isShowTooltip: boolean = false;
  iconSrc = "";
  title = "Information";
  message = "content";
  position = [0, 0];

    // a timer to show the tooltip with a delay period
    showTooltipTimer: any = null;
    // a timer to close the tooltip with a delay period
    closeTooltipTimer: any = null;
  

  //timer: any = null;

  constructor(private tooltipService: TooltipService, private el: ElementRef) {}

  ngOnInit() {
    this.tooltipService.tooltip$.subscribe(data => {

      // close it first anyway
      this.closeNotification();

      this.iconSrc = data.iconSrc;
      this.title = data.title || this.title;
      this.message = data.message;
      this.duration = data.duration || this.duration;
      this.position = data.position || this.position;


      if (data.message) {
        this.showTooltipTimer = setTimeout(() => {
          this.isShowTooltip = true;

          this.closeTooltipTimer = setTimeout(() => {
            this.closeNotification();
          }, this.duration);

        }, this.showTooltipDelay);
      }

      /*if (!data.message) { 
        this.closeNotification();
      } else {
        this.isShowTooltip = true;
      }*/
      
      /*if (this.timer) {
        clearTimeout(this.timer);
      }*/
      /*this.timer = setTimeout(() => {
        this.closeNotification();
      }, this.duration);*/
    });
  }

  
  closeNotification() {

    this.isShowTooltip = false;
    if (this.showTooltipTimer) {
      clearTimeout(this.showTooltipTimer);
      this.showTooltipTimer = null;
    }
    if (this.closeTooltipTimer) {
      clearTimeout(this.closeTooltipTimer);
      this.closeTooltipTimer = null;
    }

    //this.isShowTooltip = false;
  }


}
