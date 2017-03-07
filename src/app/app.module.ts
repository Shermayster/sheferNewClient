import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule, JsonpModule} from '@angular/http';

import { AppComponent } from './app.component';
import {SignInComponent} from "./sign-in/sign-in.component";
import {AuthGuard} from "./shared/auth.guard";
import {ProgramPageComponent} from "./parent-page/program-page/program-page.component";
import {ProtectedClass} from "./protected/protected.component";
import {SignUpComponent} from "./sign-up/sign-up.component";
import {OdotComponent} from "./odot-component/odot-component";
import {Routes, RouterModule} from "@angular/router";
import {FeedbackComponent} from "./control-panel/feedback/feedback.component";
import {ProgramCartComponent} from "./parent-page/program-page/program-cart.component/program-cart.component";
import {ActivityComponent} from "./parent-page/program-page/activity.component/activity.component";
import {SideMenuComponent} from './side-menu/side-menu.component';
import {ParentResponse} from './parent-page/response.component/response.component';
import {ParentPage} from './parent-page/paren-page.component';
import {ControlPanelComponent} from './control-panel/control-panel.component';
import {HeaderComponent} from './header/header.component';
import {ParentsModule} from './parent-page/parents.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AppAuth, AuthService} from './shared/auth.sevice';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {HttpService} from './shared/http.service';
import {PatientData, DoctorData, DataService} from './shared/data.service';

const appRoutes: Routes = [
  { path: 'odot', component: OdotComponent},
  { path: '', redirectTo: '/signin', pathMatch: 'full'},
  { path: 'signup', component: SignUpComponent},
  { path: 'signin', component: SignInComponent},
  { path: 'protected', component: ProtectedClass, canActivate: [AuthGuard]},
  { path: 'parent/program-page/:id', component: ProgramPageComponent, canActivate: [AuthGuard]},
  { path: '**',    component: SignInComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    HeaderComponent,
    SignUpComponent,
    ProtectedClass,
    ControlPanelComponent,
    ParentPage,
    ParentResponse,
    ProgramPageComponent,
    SideMenuComponent,
    ActivityComponent,
    ProgramCartComponent,
    FeedbackComponent,
    OdotComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule,
    ReactiveFormsModule,
    JsonpModule,
    ParentsModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AuthService,
    DataService,
    DoctorData,
    PatientData,
    HttpService,
    AuthGuard,
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    AppAuth],
  bootstrap: [AppComponent]
})
export class AppModule { }
