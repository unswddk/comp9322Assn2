import {Component, OnInit, ViewChild} from "@angular/core";
import {
  Router, NavigationEnd, RouterStateSnapshot, RouterState, ActivatedRouteSnapshot,
  ActivatedRoute
} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {MdSidenav} from "@angular/material";
import {User} from "../models/officer-model";
import {UserLoginService} from "../service/user-login.service";
import {UserRegisterService} from "../service/user-register.service";

@Component({
  selector: 'app-user-layout',
  templateUrl: 'user-layout.component.html'
})
export class UserLayoutComponent implements OnInit {
  private isMobile;
  public currentUser: User;
  screenSizeWatcher: Subscription;
  isSidenavOpen: Boolean = false;
  @ViewChild(MdSidenav) private sideNave: MdSidenav;

  constructor(private router: Router,
              public activatedRoute: ActivatedRoute,
              public userLoginService: UserLoginService,
              public userRegisterService: UserRegisterService) {
  }

  ngOnInit() {
    // TODO set user info
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));

    this.userLoginService.currentUser
      .merge(this.userRegisterService.currentUser)
      .subscribe(
        data => {
          this.currentUser = data;
          let activatedRouteSnapshot: ActivatedRouteSnapshot = this.activatedRoute.snapshot;
          let routerState: RouterState = this.router.routerState;
          let routerStateSnapshot: RouterStateSnapshot = routerState.snapshot;

          console.log(activatedRouteSnapshot);
          console.log(routerState);
          console.log(routerStateSnapshot);

          //如果是从/login这个URL进行的登录，跳转到首页，否则什么都不做
          // if (routerStateSnapshot.url.indexOf("/login") != -1) {
          //   this.router.navigateByUrl("/home");
          // }
        },
        error => console.error(error)
      );

  }
}
