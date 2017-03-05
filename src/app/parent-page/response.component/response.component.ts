/**
 * Created by novliza86 on 10/09/2016.
 */
import {Component, OnInit, OnDestroy} from '@angular/core'
import {Subscription} from "rxjs";
import {PatientBase} from "../../shared/patien.interface";
import {ActivatedRoute} from "@angular/router";
import {PatientData} from "../../shared/data.service";
@Component({
  selector:'parent-response',
  template:`
  <h1> response </h1>
`
})

export class ParentResponse implements OnInit, OnDestroy{
  private sub: Subscription;
  patient:PatientBase;
  constructor( private route: ActivatedRoute, public patientData:PatientData) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.patient = this.patientData._patientData;
      console.log('response patient', this.patient);
    }
    )}

    ngOnDestroy() {
      this.sub.unsubscribe();
    }

}
