import { Subject } from 'rxjs';
import {Http, Response} from "@angular/http";
import { Observable }     from 'rxjs/Observable';
import {Injectable, EventEmitter} from "@angular/core";
import {Router} from "@angular/router";
import {UserBase} from "./user.interface";
import 'rxjs/add/observable/of';
import {DataService, DoctorData} from "./data.service";
import {HttpService} from "./http.service";

/**
 *
 */
export class AppAuth {
  _authState:boolean;
}

@Injectable()
export class AuthService {
  userData:any = new EventEmitter<UserBase>();
  private doctorsUrl = "app/mock/doctors.json";
  showError = new Subject;

  constructor(private httpService:HttpService,  private router: Router, public doctorData:DoctorData , private dataService:DataService, public appAuth:AppAuth) { }


  /**check user input to sign user
   *
   */
  signinUser(values) {

     this.httpService.getDataFromServer(values)
      .subscribe(
        res => {
            let data = res;
            //let value:UserBase = data.results[0].data[0];
            let value:UserBase = data;
            //set current doctor
            this.dataService.setDoctor(value);
            localStorage.setItem('doctorData', JSON.stringify(value));
            this.router.navigate(['protected']);
            this.getAuth();
            this.showError.next(true);

        }, error => {
          this.showError.next(false);
    });
return this.showError;


  }

  /**compare inputs to data
   *
   * @param values
   * @param data
   */
  checkUser(values, data):Observable<UserBase>{
    let res:UserBase;
    let user:UserBase = data.find(obj => obj.key === values.email)
    user.password === values.password ? res = user : res = null;
    return Observable.of(res);
  }

  /**return Object by key and value
   *
   */
  returnObj(obj, value) {
    return obj.key === value;
  }

  /**check authentication app state
   *
   * @returns {boolean}
   */
  getAuth():Observable<boolean> {
    let state:boolean;
    if(this.doctorData._doctorData) {
      state = true;
    }else {
      state = false;
    }
    this.appAuth._authState = state;
    return Observable.of(state);
  }




  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
  logOut() {
    //todo: handle logout function
    this.dataService.cleanData()
  }
}
