/**
 * Created by novliza86 on 10/09/2016.
 */

import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import 'rxjs/Rx';
import { Observable }     from 'rxjs/Observable';
import {ActivityInterface} from "./activity.interface";
import {error} from "util";
import {DataService} from "./data.service";
import {Router} from "@angular/router";
import {PatientBase, ParentContact} from "./patien.interface";

@Injectable()

export class HttpService {

  private projectUrl= document.location.href.includes('2016') ? '../Server/api/' : 'http://localhost:53560/api/';
  // private projectUrl = 'http://projects.telem-hit.net/2016/Active-Me_HofitPavelOrit/Server/api/';
  private deleteFamilyApi = this.projectUrl + 'Patient/';
  private postProgramApi = this.projectUrl+'Program';
  private putProgramApi = this.projectUrl+'Program';
  private serverGetDoctor = this.projectUrl+"Email?";
  private  activitiesUrl = this.projectUrl+"Activity";
  private  addFamilyApi = this.projectUrl + "Patient";
  private updateFamilyContactApi = this.projectUrl + "Patient/contact/update";
  private addDoctorApi = this.projectUrl + "AddDoctor";
  constructor(private http: Http, private dataService: DataService, private router: Router) { }

  /**get data from server
   *
   * @returns {Observable<R>}
   */
  getDataFromServer(value) {
   return this.http.get(this.serverGetDoctor+'Email='+value.email + '&Password='+value.password)
     .map(this.extractData)
     .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }

  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  postDatatoServer() {
    //todo: write post function
  }

  //get activities list from server
  getActivitiesFromServer() {
  return this.http.get(this.activitiesUrl)
    .map(res => res.json());
  }
  //add program to family
  updateProgram(program) {
   return this.http.put(this.putProgramApi+'/'+ program.programID, program, program.programId)
      .map((res: Response) => {
        if(res.status === 204) {
          return true;
        }
      })
  }

  //add new program
  addFamilyToData(family:PatientBase) {
    console.log('service add family ', family);
    return this.http.post(this.addFamilyApi, family)
      .map(res => {
        return res.json();
      })
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

  }

  updateContact(patient: PatientBase) {
    return this.http.put(this.updateFamilyContactApi, patient);
  }

  deleteFamily(id:number) {
    return this.http.delete(this.deleteFamilyApi + id)
  }

  addDoctor(doctor) {
    return this.http.post(this.addDoctorApi, doctor);
  }
}
