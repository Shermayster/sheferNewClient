/**
 * Created by Pavel on 03/10/2016.
 */

import { Component } from '@angular/core';
import { HttpService } from '../../shared/http.service';
import { ActivityInterface } from '../../shared/activity.interface';
import { DataService, PatientData } from '../../shared/data.service';
import { ActivitiesProgram, patientActivity, PatientBase } from '../../shared/patien.interface';
import {ActivatedRoute, Router} from '@angular/router';
import {ParentService} from "../parent.service";
@Component({
  selector: 'program-page',
  templateUrl: './program-page.component.html',
  providers: [ParentService]
})
export class ProgramPageComponent {
  isNew: boolean = false;
  patient: PatientBase;
  activitiesAge3: ActivityInterface[];
  activitiesAge4: ActivityInterface[];
  activitiesAge5: ActivityInterface[];
  activitiesList: ActivityInterface[];
  activityProgram: ActivitiesProgram;
  //activeProgram: ActivitiesProgram;
  constructor(private httpService: HttpService, private dataService: DataService, private router: Router,
    public patientData: PatientData, private route: ActivatedRoute, private parentService: ParentService ) { }

  ngOnInit() {
    this.patient = this.patientData._patientData;
    if(!this.patient.patientID) { this.isNew = true; }
    this.isNew ? this.activityProgram = new ActivitiesProgram() : this.activityProgram = this.parentService.findActiveProgram(this.patient.program);
    this.httpService.getActivitiesFromServer()
      .subscribe((activities: ActivityInterface[]) => {
        this.activitiesList =  this.parentService.addValuesToActivities(activities, this.activityProgram);
        this.activitiesAge3 = this.dataService.orderActivities(this.activitiesList, '3');
        this.activitiesAge4 = this.dataService.orderActivities(this.activitiesList, '4');
        this.activitiesAge5 = this.dataService.orderActivities(this.activitiesList, '5');
      });

    this.route.params.subscribe(params => {
      let id = params['id'];
      if (String(id) === 'new') {
        this.isNew = true;
      }
    });


  }
  updateCart(activity, value) {
    let _patientActivity: patientActivity = new patientActivity;
    _patientActivity.activityId = activity.activityID;
    _patientActivity.activityName = activity.activityName;
    _patientActivity.activityType = activity.activityType;
    _patientActivity.rationaleCategory = activity.rationaleCategory;
    _patientActivity.activityGroupAge = activity.groupAge;
    _patientActivity.activityNameParent = activity.activityNameParent;
    _patientActivity.description = activity.description;
    if (!this.activityProgram.patientActivityList) {
      this.activityProgram.patientActivityList = [];
      this.activityProgram.patientActivityList.push(_patientActivity);
    }
    else {
      let index = this.activityProgram.patientActivityList.findIndex(x => x.activityId == _patientActivity.activityId);
      if (index !== -1) {
        if (!value) {
          this.activityProgram.patientActivityList.splice(index, 1);
        } else {
          this.activityProgram.patientActivityList[index] = _patientActivity;
        }
      }
      else {
        this.activityProgram.patientActivityList.push(_patientActivity);
      }
    }
  }
  addProgram() {
    this.isNew ? this.addFamily : this.updateProgram
  }
  //add program to new family and send data to server
  addFamily() {

    this.activityProgram.currentWeek = 1;
    this.activityProgram.status = true;
    this.patient.program[0] = this.activityProgram;
    this.httpService.addFamilyToData(this.patient).subscribe(
      res => {
        this.dataService.addFamilyToLocalData(res);
        this.router.navigate(['protected']);
      }
    )

  }

  // add program to existing family
  updateProgram() {
    this.activityProgram.currentWeek = 1;
    this.activityProgram.patientId = this.patientData._patientData.patientID;
    this.activityProgram.status = true;
    this.activityProgram.patientActivityList = this.parentService.addProgramId(this.activityProgram.patientActivityList,
      this.activityProgram.programID, this.activityProgram.patientId);
    this.httpService.updateProgram(this.activityProgram).subscribe(
      res => {
        if(res) {
          this.patient.program[0] = this.activityProgram;// todo: create more dynamic data
          this.router.navigate(['protected']);
        }
      }
    )

  }

  goBack() {
    this.router.navigate(['protected']);
  }
}


