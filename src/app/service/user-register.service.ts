import {CoreService} from "./core.service";
import {Injectable} from "@angular/core";
import {Observable, Subject} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {User} from "../models/officer-model";

@Injectable()
export class UserRegisterService {
  public testEmailURL = "";
  public subject: Subject<User> = new Subject<User>();

  constructor(public http: HttpClient, public router: Router,
              public coreService: CoreService) {
  }

  public get currentUser(): Observable<User> {
    return this.subject.asObservable();
  }

  public register(user: User) {
    console.log(user);

    let data = {
      "nickname": user.nickname,
      "username": user.username,
      "password": user.password,
      "role": "ROLE_USER"
    };

    let body = JSON.stringify(data);

    const headers = new HttpHeaders()
      .set("Content-Type", "application/json");

    return this.http
      .post<User>(this.coreService.baseUrl + "/api/register", body, {headers})
      .subscribe(
        data => {
          console.log("register result", data);
          // localStorage.setItem("currentUser", JSON.stringify(data));
          this.subject.next(data);
          this.router.navigateByUrl("notice");
        },
        error => {
          console.error(error);
        }
      );
  }

  public testEmail(email: string) {
    return this.http.get(this.testEmailURL)
      .map((response: Response) => response.json());
  }


}
