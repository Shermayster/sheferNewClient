/**
 * Created by Pavel on 18/09/2016.
 */
import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {AuthService} from './auth.sevice';
import {Observable} from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate{
  constructor(public authService:AuthService) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<boolean> | boolean {
        return this.authService.getAuth();
    }
}
