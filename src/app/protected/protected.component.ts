import {Component, OnInit, AfterViewInit, Input} from "@angular/core";
import {AuthService} from "../shared/auth.sevice";
import {ControlPanelComponent} from "../control-panel/control-panel.component"
import {UserBase} from "../shared/user.interface";
import {DataService} from "../shared/data.service";
import {Router} from "@angular/router";

@Component ({
  selector:'protected',
  template:`
  <span *ngIf="!userData"><h1>you are not signed!</h1> 
   <a class="nav-link" routerLink="/signin" routerLinkActive="active">כניסה למערכת</a>
  </span>
  <app-control-panel *ngIf="userData" [data]="userData"></app-control-panel>
`

})

export class ProtectedClass implements AfterViewInit{
  userData:UserBase;
  constructor(private auth: AuthService, private dataService:DataService, private router:Router) { }

  ngOnInit() {
    let data = this.dataService.getDoctorData();
    if(!data) {
      this.router.navigate(['/signin']);
    }
  }

  ngAfterViewInit() {
    let auth = this.auth.getAuth();
    auth ? this.userData = this.dataService.getDoctorData() :  this.router.navigate(['/signin']);
    console.log('user data is: ', this.userData);
  }
}
