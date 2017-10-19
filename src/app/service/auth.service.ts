import {Injectable} from "@angular/core";
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {JwtService} from "./jwt.service";
import {Observable} from "rxjs/Observable";

@Injectable()
export class AuthService implements CanActivate {
  public authToken;
  private isAuthenticated = this.getToken(); // Set this value dynamically

  constructor(private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<boolean> | Promise<boolean> | boolean  {
    if (this.isAuthenticated) {
      return true
    }
    this.router.navigate(['home']);
    return ;
  }

  public getToken(): string {

    if (localStorage.getItem('currentUser') && JSON.parse(localStorage.getItem('currentUser')).token) {
      return JSON.parse(localStorage.getItem('currentUser')).token;
    }
    return null;
  }
}
