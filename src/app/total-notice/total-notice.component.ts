import {Component, OnInit} from '@angular/core';
import {LicenseService} from "../service/license.service";
import {Notice} from "../models/notice-model";
import {ApiNotice} from "../models/api-notice-model";
import {ApiService} from "../service/api.service";
import {subscribeOn} from "rxjs/operator/subscribeOn";
import {License} from "../models/license-model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-total-notice',
  templateUrl: './total-notice.component.html',
  styleUrls: ['./total-notice.component.css']
})
export class TotalNoticeComponent implements OnInit {

  noticeList: Array<ApiNotice> = [];
  apiNoticeList: Array<ApiNotice> = [];
  public apiNotice: ApiNotice;
  public licenseList: Array<License> = [];

  constructor(public router: Router, public licenseService: LicenseService, public apiService: ApiService) {
  }


  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.apiService.getNoticeList().subscribe(
      data => {
        this.apiNoticeList = data.filter(datas => datas.status === "updated" || datas.status === "extended" || datas.status === "updateReject" || datas.status === "extendReject");
        console.log(this.apiNoticeList);
      }
    );
    this.licenseService.getNoticeByUser().subscribe(
      resq => {
        console.log(resq);
        this.noticeList = resq.filter(datas => datas.status === "updated" || datas.status === "extended" || datas.status === "updateReject" || datas.status === "extendReject");
        this.noticeList.map(notice => this.findLicenseByNotice(notice));
      }, error2 => {
        console.log(error2)
      }
    )
  }

  findLicenseByNotice(apiNotice: ApiNotice) {
    this.licenseService.getLicenseByLicenseNumber(apiNotice.licenseNumber).subscribe(
      data => {
        this.licenseList.push(data);
      }, error2 => {
      }
    )
  }

  close(apiNotice: ApiNotice) {
    this.licenseList.forEach(((value, index) => {
      if (value.number === apiNotice.licenseNumber) {
        this.licenseList.splice(index, 1);
      }
    }))
  }

  considerAgain(notice: ApiNotice) {
    if (notice.status === "updated") {
      notice.status = "updating";
      let aList = this.apiNoticeList.filter(value => value.licenseNumber === notice.licenseNumber);
      aList[0].status = "updating";
      this.apiService.updateNotice(aList[0]).subscribe(
        data => {
          this.licenseList=[];
          this.loadData();
          // this.close(notice);
        }, error2 => {

        }
      );
      this.licenseService.updateNotice(notice).subscribe(
        data => {
        }
      )
    } else if (notice.status === "extended") {
      let aList = this.apiNoticeList.filter(value => value.licenseNumber === notice.licenseNumber)
      aList[0].status = "extending";
      this.licenseService.updateNotice(notice).subscribe(
        data => {
          // this.close(notice);
        }

      );
      notice.status = "extending";
      this.apiService.updateNotice(aList[0]).subscribe(
        data => {
          this.licenseList=[];
          this.loadData();
        }
      );
    } else if (notice.status === "updateReject") {
      let aList = this.apiNoticeList.filter(value => value.licenseNumber === notice.licenseNumber)
      aList[0].status = "updating";
      notice.status = "updating";
      this.licenseService.updateNotice(notice).subscribe(
        data => {
          this.licenseList=[];
          this.loadData();
        }
      );
      this.apiService.updateNotice(aList[0]).subscribe(
        data => {
        }
      );
    } else if (notice.status === "extendReject") {
      let aList = this.apiNoticeList.filter(value => value.licenseNumber === notice.licenseNumber)
      aList[0].status = "extending";
      notice.status = "extending";
      this.licenseService.updateNotice(notice).subscribe(
        data => {
          this.licenseList=[];
          this.loadData();
        }
      );
      this.apiService.updateNotice(aList[0]).subscribe(
        data => {

        }
      );
    }
  }


}
