import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {Page} from "ui/page";
import {ClockService} from "../services/clock.service";
import {Observable} from "rxjs";
import {ClockModel} from "../services/clock.model";
import {SwipeDirection, SwipeGestureEventData} from "ui/gestures";
import {View} from "ui/core/view";

@Component({
  selector: 'clock',
  templateUrl: './worldclock/clock.component.html',
  styleUrls: ['./worldclock/clock.component.css']
})
export class ClockComponent implements OnInit {

  private clockModel$: Observable<ClockModel>;
  @ViewChild("timeContainer") container: ElementRef;

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
          this.nextTimeZone()
          break;
      case SwipeDirection.down:
          this.prevTimeZone();
          break;
    }
  }

  nextTimeZone() {
    let container = <View>this.container.nativeElement;
    let promise = container.animate({
      translate: { x: 0, y: -200},
      duration: 300
    });
    promise.then(() => {
      this.clockService.nextTimeZone();
      this.animateBackIn();
    })
  }

  prevTimeZone() {
    let container = <View>this.container.nativeElement;
    let promise = container.animate({
      translate: { x: 0, y: 200},
      duration: 300
    });
    promise.then(() => {
      this.clockService.prevTimeZone();
      this.animateBackIn();
    })
  }

  animateBackIn() {
    let container = <View>this.container.nativeElement;
    container.animate({
      translate: { x: 0, y: 0},
      duration: 500
    })
  }
}
