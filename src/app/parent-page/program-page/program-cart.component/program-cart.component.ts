/**
 * Created by Pavel on 05/10/2016.
 */

import {Component} from '@angular/core/src/metadata/directives';
import {Input} from '@angular/core';
import {ActivityInterface} from '../../../shared/activity.interface';
import {patientActivity, ActivitiesProgram} from '../../../shared/patien.interface';
@Component({
  selector: 'program-cart',
  templateUrl: './program-cart.component.html',
  styleUrls: ['./program-cart.component.css']
})

export class ProgramCartComponent {
  @Input() activityProgram: ActivitiesProgram;

  duration= [1,2,3,4,5];

  model = 1;
  ngOnInit() {
    if(!this.activityProgram.duration) {
      this.activityProgram.duration = this.model;
    }

  }

}
