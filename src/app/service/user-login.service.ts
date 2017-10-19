import {Subject, Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {CoreService} from "./core.service";
import {User} from "../models/officer-model";

/**
 * Created by langley on 16/8/17.
 */

@Injectable()
export class UserLoginService {
  // public userLoginURL = 'mock-data/user-login-mock.json';
  public subject: Subject<User> = new Subject<User>();

  constructor(public http: HttpClient, public router: Router,
              public coreService: CoreService) {
  }

  public get currentUser(): Observable<User> {
    return this.subject.asObservable();
  }

  public login(user: User) {
    return this.http
      .post<User>(this.coreService.baseUrl + "/api/login", JSON.stringify(user));
  }

  public logout(): void {
    localStorage.removeItem("currentUser");
    this.subject.next(Object.assign({}));
  }
}
