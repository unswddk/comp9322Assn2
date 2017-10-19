import {Component, OnInit} from '@angular/core';
import {User} from "../models/officer-model";
import {UserRegisterService} from "../service/user-register.service";
import {UserLoginService} from "../service/user-login.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../service/api.service";

@Component({
  selector: 'app-notice-main',
  templateUrl: './notice-main.component.html',
  styleUrls: ['./notice-main.component.css']
})
export class NoticeMainComponent implements OnInit {
  public currentUser: User;
  send=false;

  constructor(private router: Router,
              public activatedRoute: ActivatedRoute,
              public apiService:ApiService,
              public userLoginService: UserLoginService,
              public userRegisterService: UserRegisterService) {
  }


  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if(!this.currentUser){
      this.router.navigateByUrl("home")
    }
  }
  logout() {
    this.userLoginService.logout();
    this.router.navigateByUrl('');
  }
  generateNotice(){
    this.send=true;
    this.apiService.postToGetNoticeList().subscribe(data => {
        console.log(data);
      }
    );
  }
}
