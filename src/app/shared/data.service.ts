/**
 * Created by novliza86 on 3.9.2016.
 */

import {Injectable, EventEmitter} from "@angular/core";
import {UserBase} from "./user.interface";
import {PatientBase} from "./patien.interface";
import {ActivityInterface} from "./activity.interface";

export class DoctorData {
  _doctorData:UserBase;
}
export class PatientData {
  _patientData:PatientBase;
}
@Injectable()
export class DataService {
  private doctor:UserBase;
  private patient:PatientBase;
  constructor(public doctorData:DoctorData, public patientData:PatientData) { }

  /** choose current doctor to show
   *
   * @param data
   */
  setDoctor(data:UserBase) {
    this.doctor = data;
    this.doctorData._doctorData = data;
  }

  /**return doctor data
   *
   * @returns {UserBase}
   */
  getDoctorData():UserBase {
    return this.doctorData._doctorData;

  }

  /** returns patient data
   *
   * @returns {PatientBase}
   */
  getPatientData():PatientBase {
    return this.patientData._patientData;
  }

  /**choose current parent to show
   *
   * @param parent
   */
  setPatient(parent) {
    this.patientData._patientData = parent;
    console.log('patient data service: ', this.patient);
  }

  /**return current patient data
   *
   * @returns {PatientBase}
   */
  getPatient():PatientBase {
    console.log('patient data service get: ', this.patientData._patientData);
    return this.patientData._patientData;
  }

  /** clean current data variables for logout
   *
   */
  cleanData() {
    this.doctorData._doctorData = null;
    this.patientData._patientData = null;
  }

  //Create Order Activities List by Program Name
  orderActivities(activities, programName):ActivityInterface[] {
    let programActivities:ActivityInterface[] = [];
    activities.map(activity => {
      if(activity.groupAge == programName) {
        programActivities.push(activity);
      }
    })
    return programActivities;
  }

  //add new family to local data
  addFamilyToLocalData(family: PatientBase) {
    this.doctorData._doctorData.patients.push(family);
  }

  updateDa



}
