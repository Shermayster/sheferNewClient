/**
 * Created by sherm on 11/19/2016.
 */
import {Component, OnInit, Input} from '@angular/core';

import {patientActivity} from "../../shared/patien.interface";

export class ActivityFeedback {
  notCarriedOut: number = 0;
  notCooperating: number = 0;
  partialExecution:number = 0;
  successful: number = 0;
  overallActivities: number = 0;
}
@Component({

    selector: 'feedback-component',
    template: `
          <span *ngIf="activityFeedback">
          <span   *ngIf="activityFeedback.notCarriedOut>0"><span>{{activityFeedback.notCarriedOut}}</span>  פעילויות  לא בוצעו מתוך {{activityFeedback.overallActivities}}  פעילויות</span>
            <span  *ngIf="activityFeedback.notCooperating>0" ><span>{{activityFeedback.notCooperating}}</span>  פעילויות  לא שיתף פעולה מתוך {{activityFeedback.overallActivities}}  פעילויות</span>
            <span  *ngIf="activityFeedback.partialExecution>0"><span>{{activityFeedback.partialExecution}}</span>  בוצע חלקית מתוך {{activityFeedback.overallActivities}} </span>
            <span  *ngIf="activityFeedback.successful>0"><span>{{activityFeedback.successful}}</span> בוצע מתוך {{activityFeedback.overallActivities}}  פעולוית</span>
          </span>
            

`
})
export class FeedbackComponent implements OnInit {
  @Input() activity: patientActivity[];

  activityFeedback: ActivityFeedback = new ActivityFeedback;

  constructor() {
  }

  ngOnInit() {
    if(this.activity) {
      this.countFeedback(this.activity);
    }

  }


  countFeedback(activity:patientActivity[]):void {
    let _that = this;
    activity.map(feedback => {
      _that.activityFeedback.overallActivities ++;
      switch (feedback.activityFeedback) {
        case 'Not Carried Out':
          _that.activityFeedback.notCarriedOut ++;
          break;
        case 'Not Cooperating':
          _that.activityFeedback.notCooperating ++;
          break;
        case 'PartialExecution':
          _that.activityFeedback.partialExecution ++;
          break;
        case 'Successful':
          _that.activityFeedback.successful ++;
          break
      }
    } );


  }

}
