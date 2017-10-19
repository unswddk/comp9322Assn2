import {Component, Inject, OnInit} from '@angular/core';
import {Notice} from "../models/notice-model";
import {LicenseService} from "../service/license.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {MatDialogRef} from "@angular/material/dialog";
import {ApiNotice} from "../models/api-notice-model";
import {ApiService} from "../service/api.service";
import {License} from "../models/license-model";

@Component({
  selector: 'app-extend-notice',
  templateUrl: './extend-notice.component.html',
  styleUrls: ['./extend-notice.component.css']
})
export class ExtendNoticeComponent implements OnInit {

  noticeList: Array<Notice>;
  apiNoticeList: Array<ApiNotice>=[];
  licenseList: Array<License>=[];

  constructor(public licenseService: LicenseService, public dialog: MatDialog, public apiService: ApiService) {

  }


  ngOnInit() {
    this.loadteNotice();
  }


  public loadteNotice() {
    return this.apiService.getNoticeList().subscribe(data => {
      this.apiNoticeList = data;
      this.apiNoticeList = data.filter(notice => notice.status === "extending");
      this.apiNoticeList.map(notice => this.findLicenseByNotice(notice));
      console.log(this.apiNoticeList);
    }, error2 => {
      console.log(error2);
    })
  }


  // loadData() {
  //   this.licenseService.getNoticesByStatus("extending").subscribe(req => {
  //       console.log(req);
  //       this.noticeList = req;
  //     }, error2 => {
  //       console.log(error2);
  //     }
  //   );
  // }



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


  openRejectDialog(notice: ApiNotice): void {
    let dialogRef = this.dialog.open(DialogOverviewExtendDialog, {
      height: '320px',
      width: '300px',
    });
    dialogRef.afterClosed().subscribe(result => {
        if (result) {
          console.log(result);
          notice.status = "extendReject";
          notice.rejectionReason = result;
          console.log(notice);
          this.apiService.updateNotice(notice).subscribe(data => {
            // this.close(notice);
          }, error2 => {
          });
          this.licenseService.updateNotice(notice).subscribe(resp => {
            console.log(resp);
            this.licenseList=[];
            this.loadteNotice();
          }, error2 => {
            console.log(error2);
          });
        }
      },
      err => {
      });
  }

  accept(notice: ApiNotice) {
    notice.status = "extended";
    this.licenseService.updateNotice(notice).subscribe(data => {
      // this.close(notice);

      console.log(data);
    }, error2 => {
      console.log(error2);
    });
    this.apiService.updateNotice(notice).subscribe(data=>{
      this.licenseList=[];
      this.loadteNotice();
    })
  }
}

@Component({
  selector: 'dialog-overview-extend-dialog',
  templateUrl: 'dialog-overview-extend-dialog.html',
})
export class DialogOverviewExtendDialog {

  rejectFormGroup: FormGroup;


  constructor(public _formBuilder: FormBuilder, public licenseService: LicenseService,
              public dialogRef: MatDialogRef<DialogOverviewExtendDialog>,
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

