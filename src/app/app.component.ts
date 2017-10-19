import { Component, HostListener, ElementRef, Renderer, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot } from '@angular/router';
import 'rxjs/add/operator/merge';
import {User} from "./models/officer-model";
import {UserLoginService} from "./service/user-login.service";
import {UserRegisterService} from "./service/user-register.service";
import {AuthService} from "./service/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public currentUser: User;
  private globalClickCallbackFn: Function;
  private loginSuccessCallbackFn: Function;

  constructor(
    public elementRef: ElementRef,
    public renderer: Renderer,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public userLoginService: UserLoginService,
    public authService:AuthService,
    public userRegisterService: UserRegisterService
  ) {

  }

  ngOnInit() {
    this.globalClickCallbackFn = this.renderer.listen(this.elementRef.nativeElement, 'click', (event: any) => {
    });

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
          if (routerStateSnapshot.url.indexOf("/home") != -1) {
            this.router.navigateByUrl("/notice");
          }
        },
        error => console.error(error)
      );

    //ng2-translate国际化服务相关的配置
  }

  ngOnDestroy() {
    if (this.globalClickCallbackFn) {
      this.globalClickCallbackFn();
    }
  }

  toggle(button: any) {
    console.log(button);
  }

  public doLogout(): void {
    this.userLoginService.logout();
    this.router.navigateByUrl("");
  }
}
