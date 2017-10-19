import {Component, Inject, OnInit} from '@angular/core';
import {LicenseService} from "../service/license.service";
import {Notice} from "../models/notice-model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {MatDialog} from "@angular/material/dialog";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {MatDialogRef} from "@angular/material/dialog";
import {ApiService} from "../service/api.service";
import {ApiNotice} from "../models/api-notice-model";
import {License} from "../models/license-model";

@Component({
  selector: 'app-update-notice',
  templateUrl: './update-notice.component.html',
  styleUrls: ['./update-notice.component.css']
})
export class UpdateNoticeComponent implements OnInit {


  noticeList: Array<Notice>;
  apiNoticeList: ApiNotice [];
  updateNoticeList: Array<ApiNotice>;
  apiNotice: ApiNotice;
  public licenseList: Array<License> = [];

  constructor(public licenseService: LicenseService, public dialog: MatDialog, public apiService: ApiService) {

  }


  ngOnInit() {
    this.loadNotice();
  }


  loadNotice() {
    return this.apiService.getNoticeList().subscribe(data => {
      this.apiNoticeList = data.filter(notice => notice.status === "updating");
      this.apiNoticeList.map(notice => {
          this.findLicenseByNotice(notice);
      });
    }, error2 => {
      console.log(error2);
    })
  }

  loadDta() {
    this.licenseService.getNoticesByStatus("updating").subscribe(req => {
        console.log(req);
        this.noticeList = req;
      }, error2 => {
        console.log(error2);
      }
    );
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


  openRejectDialog(apiNotice: ApiNotice): void {
    let dialogRef = this.dialog.open(DialogOverviewRejectDialog, {
      height: '320px',
      width: '300px',
    });
    dialogRef.afterClosed().subscribe(result => {
        if (result) {
          console.log(result);
          apiNotice.status = "updateReject";
          apiNotice.rejectionReason = result;
          this.apiService.updateNotice(apiNotice).subscribe(
            data => {
              // this.close(apiNotice);
              this.licenseList=[];
              this.loadNotice();
            }
          );
          this.licenseService.updateNotice(apiNotice).subscribe(
            data => {
            });
        }
      },
      err => {
      });
  }

  accept(notice: ApiNotice) {
    notice.status = "updated";
    this.apiService.updateNotice(notice).subscribe(data => {
      // this.close(notice);
      this.licenseList=[];
      this.loadNotice();
    }, error2 => {
    });
    this.licenseService.updateNotice(notice).subscribe(data => {
    }, error2 => {
      // this.close(notice);
      // this.loadNotice();
      console.log(error2);
    });
  }

}

@Component({
  selector: 'dialog-overview-reject-dialog',
  templateUrl: 'dialog-overview-reject-dialog.html',
})
export class DialogOverviewRejectDialog {

  rejectFormGroup: FormGroup;


  constructor(public _formBuilder: FormBuilder, public licenseService: LicenseService,
              public dialogRef: MatDialogRef<DialogOverviewRejectDialog>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.rejectFormGroup = this._formBuilder.group({
      reason: ["", Validators.required],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onReject() {
    this.dialogRef.close(this.rejectFormGroup.value.reason);
  }
}

