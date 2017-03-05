/**
 * Created by Pavel on 04/10/2016.
 */

import {Component, Output, EventEmitter} from "@angular/core";
import {Input} from "@angular/core/src/metadata/directives";
import {ActivityInterface} from "../../../shared/activity.interface";
import {patientActivity} from "../../../shared/patien.interface";
@Component({
  selector:'activity-component',
  templateUrl:'./activity.component.html',
  styleUrls:['./activity.component.css']
})
export class ActivityComponent {
  @Input() activity:ActivityInterface;
  showFreq:boolean = false;

  changeValue(e) {
   /* let patientActivity:patientActivity = new patientActivity;
    patientActivity.activityId = this.activity.activityID;
    patientActivity.activityName = this.activity.activityName;
    patientActivity.activityType = this.activity.activityType;
    patientActivity.added = e.target.value;
    console.log('value changes: ', patientActivity);*/
    //this.valueUpdated.emit(patientActivity)
  }
}
