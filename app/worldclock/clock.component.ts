import {Component, OnInit} from "@angular/core";
import {Page} from "ui/page";
import {ClockService} from "../services/clock.service";
import {Observable} from "rxjs";
import {ClockModel} from "../services/clock.model";
import {SwipeDirection, SwipeGestureEventData} from "ui/gestures";

@Component({
  selector: 'clock',
  templateUrl: './worldclock/clock.component.html',
  styleUrls: ['./worldclock/clock.component.css']
})
export class ClockComponent implements OnInit {

  private clockModel$: Observable<ClockModel>;

  constructor(private page: Page, private clockService: ClockService) {
  }

  ngOnInit() {
    this.page.actionBarHidden = true;
    this.clockModel$ = this.clockService.getClock();
  }

  onSwipe(args: SwipeGestureEventData) {
    //console.log("Swipe Direction: " + args.direction);
    switch (args.direction) {
      case SwipeDirection.up:
          this.clockService.nextTimeZone();
          break;
      case SwipeDirection.down:
          this.clockService.prevTimeZone();
          break;
    }
  }

  nextTimeZone() {
    this.clockService.nextTimeZone();
  }

  prevTimeZone() {
    this.clockService.prevTimeZone();
  }
}
