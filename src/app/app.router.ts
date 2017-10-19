import {Routes} from "@angular/router";
import {SigninComponent} from "./signin/signin.component";
import {HomeComponent} from "./home/home.component";
import {DriverComponent} from "./driver/driver.component";
import {NoticeMainComponent} from "./notice-main/notice-main.component";
import {SignupComponent} from "./signup/signup.component";
import {SendNoticeComponent} from "./send-notice/send-notice.component";
import {AuthService} from "./service/auth.service";


export const rootRouterConfig: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },

  {
    path: '', canActivate: [AuthService], children: [
    {
      path: 'notice',
      component: NoticeMainComponent,
    },]
  },
  {
    path: 'driver/:token/:id',
    component: DriverComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: '**',
    component: HomeComponent,
  }
];
