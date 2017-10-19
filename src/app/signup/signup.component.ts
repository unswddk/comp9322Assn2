import { Component, OnInit, ViewChild } from '@angular/core';
import { MdProgressBar, MdButton } from '@angular/material';
import {Router} from "@angular/router";
import {User} from "../models/officer-model";
import {UserRegisterService} from "../service/user-register.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['signup.component.css']
})
export class SignupComponent implements OnInit {
  @ViewChild(MdProgressBar) progressBar: MdProgressBar;
  @ViewChild(MdButton) submitButton: MdButton;
  signupData = {
    username: '',
    nickname: '',
    password: '',
    confirmPassword: '',
    isAgreed: ''
  };

  constructor(public userRegisterService: UserRegisterService,
              public router: Router) {}

  ngOnInit() {
  }

  signup() {
    console.log(this.signupData);

    this.submitButton.disabled = true;
    let user: User = new User();
    user.nickname = this.signupData.nickname;
    user.username = this.signupData.username;
    user.password = this.signupData.password;
    console.log(user);
    this.userRegisterService.register(user);
  }

}
