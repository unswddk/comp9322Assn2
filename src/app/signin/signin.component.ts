import {Component, OnInit, ViewChild} from "@angular/core";
import {MatProgressBar, MatButton} from "@angular/material";
import {Router} from "@angular/router";
import {User} from "../models/officer-model";
import {UserLoginService} from "../service/user-login.service";
import {Subject} from "rxjs/Subject";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['signin.component.scss']
})
export class SigninComponent implements OnInit {
  @ViewChild(MatButton) submitButton: MatButton;
  public subject: Subject<User> = new Subject<User>();
  signinData = {
    email: '',
    password: '',
    rememberMe: ''
  };

  constructor(public userLoginService: UserLoginService,
              public router: Router) {
  }

  ngOnInit() {

  }
  signIn() {
    console.log(this.signinData);
    this.submitButton.disabled = true;
    let user = new User();
    user.username = this.signinData.email;
    user.password = this.signinData.password;
    console.log(user);
    this.userLoginService.login(user).subscribe(
      data => {
        console.log("login success>" + data);
        if (data && data.token) {
          console.log(data.username+"username");
          localStorage.setItem("currentUser", JSON.stringify(data));
          this.router.navigateByUrl('/notice');
          this.subject.next(Object.assign({}, data));

        }
      },
      error => {
        console.error("login failed"+ error);
      }
    );
  }
}
