import { Component, OnInit } from '@angular/core';

// import { UserService } from '../services';
import {ActivatedRoute, ActivatedRouteSnapshot, Router, RouterState, RouterStateSnapshot} from "@angular/router";
import {User} from "../models/officer-model";
import {UserLoginService} from "../service/user-login.service";
import {UserRegisterService} from "../service/user-register.service";

@Component({
  selector: 'layout-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  public currentUser: User;
  constructor(private router: Router,
              public activatedRoute: ActivatedRoute,
              public userLoginService: UserLoginService,
              public userRegisterService: UserRegisterService) {
    };
  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
  }
  logout() {
    this.userLoginService.logout();
    this.router.navigateByUrl('');
  }
}
