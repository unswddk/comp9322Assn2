import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Rx";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {CoreService} from "./core.service";
import {License} from "../models/license-model";
import {UserLoginService} from "./user-login.service";
import {Notice} from "../models/notice-model";
import {Address} from "../models/address-model";
import {ApiNotice} from "../models/api-notice-model";


@Injectable()
export class LicenseService {
  // public courseListURL = 'mock-data/course-list-mock.json';
  public headers = new Headers({'Content-Type': 'application/json'});
  public user = localStorage.getItem("currentUser");

  constructor(public http: HttpClient, public coreService: CoreService, public userLoginService: UserLoginService) {
  }

  public getLicenseList(searchText: string, page: number = 1): Observable<License[]> {
    const params = new HttpParams()
      .set('page', String(page));
    return this.http.get<License[]>(this.coreService.baseUrl + "/api/license", {params})
  }

  public getLicenseById(id: String) {
    return this.http.get<License>(this.coreService.baseUrl + "/api/license/" + id);
  }

  public sendNotice(notice: ApiNotice) {
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json");
    return this.http.post<Notice>(this.coreService.baseUrl + "/api/notice", JSON.stringify(notice), {headers});
  }

  public getNoticeById(id: String) {
    return this.http.get<Notice>(this.coreService.baseUrl + "/api/notice/" + id);
  }


  public getLicenseByLicenseNumber(licenseNumber: String) {
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json");
    return this.http.get<License>(this.coreService.baseUrl + "/api/license/" + licenseNumber, {headers});
  }


  public checkEmail(email: String) {
    const params = new HttpParams()
      .set('email', String(email));
    return this.http.get<boolean>(this.coreService.baseUrl + "/api/validate", {params});
  }

  public checkAddress(address: Address) {
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json");
    return this.http.post<boolean>(this.coreService.baseUrl + "/api/validate", JSON.stringify(address), {headers});
  }

  public updateNotice(notice: ApiNotice) {
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json");
    return this.http.put<ApiNotice>(this.coreService.baseUrl + "/api/notice", JSON.stringify(notice), {headers});
  }

  public getNoticesByStatus(status: string) {
    const params = new HttpParams()
      .set('status', String(status));
    return this.http.get<Notice[]>(this.coreService.baseUrl + "/api/notice", {params});
  }

  public updateNoticePayment(notice: Notice) {
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json");
    return this.http.put<Notice>(this.coreService.baseUrl + "/api/notice", JSON.stringify(notice), {headers})
  };

  public getNoticeByUser() {
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json");
    return this.http.post<ApiNotice[]>(this.coreService.baseUrl + "/api/notice/total", {headers});
  }

  public deleteNotice(noticeId:number) {
    const params = new HttpParams()
      .set('noticeId', String(noticeId));
    return this.http.delete(this.coreService.baseUrl + "/api/notice",{params});
  }
  
  public updateLicense(license: License) {
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json");
    return this.http.put<License>(this.coreService.baseUrl + "/api/license", JSON.stringify(license), {headers});
  }
}
