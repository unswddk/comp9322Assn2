import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {LicenseService} from "../service/license.service";
import {License} from "../models/license-model";
import {ApiService} from "../service/api.service";
import {Notice} from "../models/notice-model";
import {ApiNotice} from "../models/api-notice-model";
import {forEach} from "@angular/router/src/utils/collection";

@Component({
  selector: 'app-send-notice',
  templateUrl: './send-notice.component.html',
  styleUrls: ['./send-notice.component.css']
})
export class SendNoticeComponent implements OnInit {
  public licenseList: Array<License> = [];
  public noticeLicenseList: License[] = [];
  public currentPage: number = 1;
  public searchText: string;
  public currentDate: Date;
  public compDate: Date;
  public lic: License;
  public noticeList: Array<ApiNotice> = [];

  constructor(public router: Router,
              public activeRoute: ActivatedRoute,
              public licenseService: LicenseService,
              public apiService: ApiService) {
  }

  ngOnInit() {
    // this.loadData(this.searchText, this.currentPage);
    this.loadNotice();
  }

  public loadNotice() {
    return this.apiService.getNoticeList().subscribe(data => {
      console.log(data);
      this.noticeList = data.filter(datas => datas.status === "new");
      console.log(this.noticeList);
      this.noticeList.map(value => this.licenseService.getLicenseByLicenseNumber(value.licenseNumber).subscribe(
        data => {
          console.log(data);
          if (data.noticed === false) {
            this.licenseList.push(data);
          }
        }
      ));
      console.log(this.licenseList);
    }, error2 => {
      console.log(error2);
    }, () => {
    })
  }

  // public loadData(searchText: string, page: number) {
  //   return this.licenseService.getLicenseList(searchText, page).subscribe(
  //     res => {
  //       this.licenseList = res;
  //       this.currentDate = new Date();
  //       this.compDate = new Date(this.currentDate.getTime() + (60 * 60 * 60 * 24 * 1000));
  //       for (let i = 0; i < this.licenseList.length; i++) {
  //         let coDate = new Date(this.licenseList[i].expiryDate);
  //         if (this.currentDate <= coDate && coDate <= this.compDate && !this.licenseList[i].noticed) {
  //           this.noticeLicenseList.push(this.licenseList[i]);
  //         }
  //       }
  //     },
  //     error => {
  //       console.log(error)
  //     },
  //     () => {
  //     }
  //   );
  // }

  sendNotice(license: License) {
    license.noticed = true;
    this.licenseList.forEach((value, index) => {
      if (value.id === license.id) {
        this.licenseList.splice(index, 1)
      }
    });
    this.noticeList.forEach((value, index) => {
      if (value.licenseNumber === license.number) {
        this.licenseService.sendNotice(this.noticeList[index]).subscribe(
          data => {
          }, error2 => {
          }
        );
      }
    });

    //
    // this.licenseService.sendNotice(license).subscribe(
    //   res => {
    //     console.log("succcess");
    //   },
    //   err => {
    //     console.log("succcess" + err);
    //   },
    //   () => {
    //   })


  }
}
