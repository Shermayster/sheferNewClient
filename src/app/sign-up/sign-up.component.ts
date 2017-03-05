import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import {HttpService} from "../shared/http.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
/*  styleUrls: ['./sign-up.component.ts']*/
})
export class SignUpComponent implements OnInit {
  isSignUp:boolean = false;
  signupForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private httpService:HttpService, private router:Router) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required,
        Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")])],
      password: ['', Validators.required]
    })
  }

  onSubmit() {
    this.addDoctor();
  }

  addDoctor() {
    let newDoctor = {};
    newDoctor['email'] = this.signupForm.value.email;
    newDoctor['password'] = this.signupForm.value.password;
    this.httpService.addDoctor(newDoctor).subscribe(
      res=> this.isSignUp = true
    )

  }

}
