import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {License} from "../models/license-model";
import {User} from "../models/officer-model";



@Component({
  selector: 'home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public currentUser: User;
  constructor(private router: Router,
              public activeRoute: ActivatedRoute) {
  }
ngOnInit(){ this.currentUser = JSON.parse(localStorage.getItem("currentUser"));}

}
