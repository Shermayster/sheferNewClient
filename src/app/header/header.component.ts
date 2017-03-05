import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthService} from "../shared/auth.sevice";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {
  isSignIn: boolean = false;
  constructor(private  authService: AuthService, private router:Router) { }

  ngOnInit() {
   this.router.events.subscribe(
     event => {
       if(event.url === '/protected') {
         this.isSignIn = true;
       }
       if(event.url === '/signin') {
         this.isSignIn = false;
       }
     }
   )

  }

  navToOdot() {
    this.router.navigate(['/odot']);
  }

}
