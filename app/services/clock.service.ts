import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {ClockModel} from "./clock.model";
import * as moment from "moment";
import "moment-timezone";

@Injectable()
export class ClockService {

    private readonly timeZoneCity: Array<TimeZoneCity> = [
        new TimeZoneCity("New York", "America/New_York"),
        new TimeZoneCity("Berlin", "Europe/Berlin"),
        new TimeZoneCity("Tokyo", "Asia/Tokyo")
    ];

    private actualTimeZoneIndex: number = 0;
    private readonly clock$: Observable<ClockModel>;

    constructor() {
        this.clock$ = Observable.timer(0, 1).map(n => this.calculateTime());
    }

    getClock(): Observable<ClockModel> {
        return this.clock$;
    }

    calculateTime(): ClockModel {
        const actualTimeZone = this.timeZoneCity[this.actualTimeZoneIndex];
        const momentTimeInZone = moment(Date.now()).tz(actualTimeZone.timeZoneString);
        const calculatedDate = new Date(momentTimeInZone.year(), momentTimeInZone.month(),
            momentTimeInZone.date(), momentTimeInZone.hour(), momentTimeInZone.minute(),
            momentTimeInZone.second());
        return new ClockModel(actualTimeZone.city, calculatedDate);
    }

    prevTimeZone() {
        let newIndex = this.actualTimeZoneIndex - 1;
        if(newIndex < 0) {
            newIndex = this.timeZoneCity.length - 1;
        }
        this.actualTimeZoneIndex = newIndex;
    }

    nextTimeZone() {
        let newIndex = this.actualTimeZoneIndex + 1;
        if(newIndex >= this.timeZoneCity.length) {
            newIndex = 0;
        }
        this.actualTimeZoneIndex = newIndex;
    }
}

class TimeZoneCity {
    constructor(public city: string, public timeZoneString: string) {}
}