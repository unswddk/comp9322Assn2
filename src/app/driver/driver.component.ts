import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {License} from "../models/license-model";
import {LicenseService} from "../service/license.service";
import {Notice} from "../models/notice-model";
import {Address} from "../models/address-model";
import {MatDialog} from "@angular/material/dialog";
import {MatDialogRef} from "@angular/material/dialog";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {ApiService} from "../service/api.service";
import {ApiNotice} from "../models/api-notice-model";
import {Payment} from "../models/payment-model";
import {HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css']
})
export class DriverComponent implements OnInit {
  isLinear = true;

  apiNotice: ApiNotice;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  id: string;
  token: string;
  private sub: any;
  notice: Notice;
  next = true;
  license: License;
  address: Address;
  payment: Payment;
  rejection = "";


  constructor(private _formBuilder: FormBuilder, public dialog: MatDialog, public apiService: ApiService,
              private route: ActivatedRoute, public licenseService: LicenseService) {
    this.thirdFormGroup = this._formBuilder.group({
      payment: ["", [Validators.required]]
    });
  }

  ngOnInit() {
    this.loadData()
  }

  loadData() {
    this.sub = this.route.params.subscribe(params => {
      this.token = params['token'];
      this.id = params['id'];
    });// (+) converts string 'id' to a number
    //api service
    this.apiService.getNoticeById(this.token, this.id).subscribe(
      data => {
        this.apiNotice = data;
        // this.apiService.getPayment(this.payment, this.apiNotice).subscribe(
        //   data => {
        //     console.log(data);
        //   }, error2 => {
        //     console.log(error2);
        //   }
        // );
        this.licenseService.getLicenseByLicenseNumber(this.apiNotice.licenseNumber).subscribe(
          req => {
            this.license = req;
            console.log(this.license);
          },
          error2 => {
            console.log(location.href)
          }
        );
        console.log(data);
      }, error2 => {
        console.log(error2);
      }
    );


    // this.licenseService.getNoticeById(this.id).subscribe(
    //   req => {
    //     this.notice = req;
    //   },
    //   error2 => {
    //     console.log(location.href)
    //   }
    // );

  }


  validateAmount() {
    if (this.apiNotice) {
      return this.apiNotice.status === "extended" ? "1000" !== this.thirdFormGroup.value.payment : this.apiNotice.status === "paid" || "200" !== this.thirdFormGroup.value.payment;
    }
    return true;
  }

  emailValidator(email: string) {
    this.licenseService.checkEmail(email).subscribe(req => {
        console.log(req);
        return req;
      },
      error => {
        console.log(error);
      }
    )
  }

  first() {
    if (this.apiNotice) {
      return this.apiNotice.status === "extendReject" || this.apiNotice.status === "extending" || this.apiNotice.status === "updateReject" || this.apiNotice.status === "updated" || this.apiNotice.status === "paid";
    }
    return false;
  }

  second() {
    if (this.apiNotice) {
      return this.apiNotice.status === "updating" || this.apiNotice.status === "extended" || this.apiNotice.status === "extendReject" || this.apiNotice.status === "updateReject" || this.apiNotice.status === "paid";
    }
    return false;
  }

  addressValidator() {
    this.licenseService.checkAddress(this.address).subscribe(
      req => {
        console.log(req + "address validation");
        return req;
      }, error2 => {
        console.log("validate error")
      }
    );
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      height: '320px',
      width: '500px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed ' + result);
      if (result) {
        if (result.validate) {
          this.apiNotice.address = result.inputAddress;
          this.apiNotice.email = result.email;
          this.notice.status = "updated";
          this.apiService.updateNotice(this.apiNotice).subscribe(req => {
            console.log(req);
            this.loadData();
          }, error2 => {
            console.log("error update" + error2);
          });
          this.licenseService.updateNotice(this.apiNotice).subscribe(rep => {
            console.log(rep)
          });
        } else {
          this.apiNotice.address = result.inputAddress;
          this.apiNotice.email = result.email;
          this.apiNotice.status = "updating";
          this.apiService.updateNotice(this.apiNotice).subscribe(req => {
            console.log("req");
            this.loadData();
          }, error2 => {
            console.log("error update" + error2);
          });
          this.licenseService.updateNotice(this.apiNotice).subscribe(rep => {
            console.log(rep);
          })
        }
      }
    }, error2 => {
      console.log('The dialog was closed ' + error2);
    });
  }

  extend(notice: ApiNotice) {
    notice.status = "extending";
    // notice.rejectionReason="";
    console.log(notice);
    this.apiService.updateNotice(notice).subscribe(
      req => {
        console.log(req);
      }, error2 => {
        console.log(error2)
      }
    );
    this.licenseService.updateNotice(notice).subscribe(
      req => {
        console.log(req);
      }, error2 => {
        console.log(error2)
      }
    );
  }

  pay() {
    let d = new Date();

    let payment = {
      paidDate: d,
      amount: this.thirdFormGroup.value
    };
    // this.payment.paidDate = d;
    // this.payment.amount =this.thirdFormGroup.value;
    console.log(payment);
    this.apiService.updatePayment(payment, this.apiNotice.token, this.apiNotice.noticeId + "").subscribe(
      data => {
        console.log(data);
      }
    );

    //this.currentDate.getTime() + (60 * 60 * 60 * 24 * 1000)
    if (this.apiNotice.status === "extended") {
      console.log(this.license.expiryDate);

      var date = new Date(this.license.expiryDate);
      console.log(date);
      date.setFullYear(date.getFullYear() + 5);
      this.license.expiryDate=date;
      console.log(this.license.expiryDate);
      this.license.email = this.apiNotice.email;
      this.license.address = this.apiNotice.address;
      this.apiService.updateLicense(this.license, this.apiNotice.token, this.apiNotice.licenseNumber).subscribe(
        data => {
          console.log(data);

        }, (resp: HttpResponse<any>) => {
          console.log(resp);
        }
      );
      this.licenseService.updateLicense(this.license).subscribe(data => {
        console.log(data);
      }, error2 => {
        console.log(error2);
      })
    } else if (this.apiNotice.status === "updateReject" || this.apiNotice.status === "extendReject") {
      this.rejection = this.apiNotice.rejectionReason;
    } else {
      let time = new Date(this.license.expiryDate).getTime() + (365 * 60 * 60 * 24 * 1000);
      this.license.expiryDate = new Date(time);
      this.license.email = this.apiNotice.email;
      this.license.address = this.apiNotice.address;
      console.log(this.license);
      this.apiService.updateLicense(this.license, this.apiNotice.token, this.apiNotice.licenseNumber).subscribe(
        data => {
          console.log(data);
        });
    }
    this.licenseService.updateLicense(this.license).subscribe(data => {
      console.log(data);
    }, error2 => {
      console.log(error2);
    });
    this.apiNotice.status = "paid";
    this.apiService.updateNotice(this.apiNotice).subscribe(
      data => {
        console.log(data);
      }, error2 => {
        console.log(error2)
      }
    );
    this.licenseService.updateNotice(this.apiNotice).subscribe(
      data => {
        console.log(data);
      }, error2 => {
        console.log(error2);
      }
    )
    // this.licenseService.updateNoticePayment(payment).subscribe(resp => {
    //   console.log(resp);
    // }, error2 => {
    //   console.log(error2);
    // })
  }

  doneDisable() {
    if (this.apiNotice) {
      return this.apiNotice.status !== "paid" && this.apiNotice.status !== "updateRject" && this.apiNotice.status !== "extendReject";
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  done(apiNotice: ApiNotice) {
    console.log(apiNotice);
    this.apiService.deleteNotice(apiNotice).subscribe((rep: Response) => {
        console.log(rep.body + "delete notice");
      }
    );
    this.licenseService.deleteNotice(apiNotice.noticeId).subscribe(
      data => {
        console.log(data);
      }
    );
    //
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {

  firstFormGroup: FormGroup;
  validateAdd = false;
  validateEmail = false;

  constructor(public _formBuilder: FormBuilder, public licenseService: LicenseService,
              public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.firstFormGroup = this._formBuilder.group({
      email: ["", Validators.required],
      preStreet: ["", Validators.required],
      streetName: ["", Validators.required],
      streetType: ["", Validators.required],
      suburb: ["", Validators.required],
      state: ["", Validators.required],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  onSubmit() {
    let address = {
      streetName: this.firstFormGroup.value.streetName,
      preStreet: this.firstFormGroup.value.preStreet,
      state: this.firstFormGroup.value.state,
      suburb: this.firstFormGroup.value.suburb,
      streetType: this.firstFormGroup.value.streetType,
    };
    this.addressValidator(address);
    this.emailValidator(this.firstFormGroup.value.email);
    if (this.validateEmail && this.validateAdd) {
      let data = {
        validate: true,
        inputAddress: address.preStreet + " " + address.streetName + " " + address.streetType + ", " + address.suburb + ", " + address.suburb,
        email: this.firstFormGroup.value.email,
      };

      this.dialogRef.close(data);
    } else {
      let data = {
        validate: false,
        inputAddress: address.preStreet + " " + address.streetName + " " + address.streetType + ", " + address.suburb + ", " + address.suburb,
        email: this.firstFormGroup.value.email,
      };
      this.dialogRef.close(data);
    }
  }

  emailValidator(email: string) {
    this.licenseService.checkEmail(email).subscribe(req => {
        console.log(req);
        this.validateEmail = req;
      },
      error => {
        this.validateEmail = false;
      }
    )
  }

  addressValidator(address: Address) {
    this.licenseService.checkAddress(address).subscribe(
      req => {
        console.log(req + "address validation");
        this.validateAdd = req;
      }, error2 => {
        console.log("validate error");
        this.validateAdd = false;
      }
    );
  }

}
