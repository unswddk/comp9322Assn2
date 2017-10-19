import {Injectable} from '@angular/core';
import {Headers, Http, Response, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {environment} from "../../environments/environment";
import {JwtService} from "./jwt.service";
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from "@angular/common/http";
import {CoreService} from "./core.service";
import {Notice} from "../models/notice-model";
import {ApiNotice} from "../models/api-notice-model";
import {Payment} from "../models/payment-model";
import {License} from "../models/license-model";


@Injectable()
export class ApiService {
  constructor(private http: HttpClient,
              private jwtService: JwtService, private coreService: CoreService) {
  }

  private setHeaders(): Headers {
    const headersConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    if (this.jwtService.getToken()) {
      headersConfig['Authorization'] = `Token ${this.jwtService.getToken()}`;
    }
    return new Headers(headersConfig);
  }

  public getNoticeList() {
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json");
    return this.http.get<ApiNotice []>(this.coreService.apiUrl, {headers})
  }



  public postToGetNoticeList() {
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json");
    return this.http.post<ApiNotice []>(this.coreService.apiUrl, {headers})
  }
  public getNoticeById(token: string, id: string) {
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json");
    return this.http.get<ApiNotice>(this.coreService.apiUrl + "/" + token + "/" + id, {headers});
  }

  public updateNotice(apiNotice: ApiNotice) {
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json");
    return this.http.put<ApiNotice>(this.coreService.apiUrl + "/" + apiNotice.token + "/" + apiNotice.noticeId, JSON.stringify(apiNotice), {headers})
  }


  public updatePayment(payment: Payment, token: string, id: string) {
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json");
    return this.http.put<Payment>(this.coreService.apiUrl + "/" + token + "/" + id, JSON.stringify(payment), {headers})
  }


  updateLicense(license: License, token: string, id: string) {
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json");
    return this.http.put<License>("http://licenserenewalservice-env.2qcm7emnen.ap-southeast-2.elasticbeanstalk.com/licenses/" + token + "/" + id, JSON.stringify(license), {headers})
  }

  public getPayment(payment: Payment, apiNotice: ApiNotice) {
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json");
    return this.http.post(this.coreService.apiUrl + "/payments/" + apiNotice.token + "/" + apiNotice.noticeId, JSON.stringify(apiNotice), {headers});
  }

  public deleteNotice(apiNotice: ApiNotice) {
    return this.http.delete(this.coreService.apiUrl + "/" + apiNotice.token + "/" + apiNotice.noticeId, JSON.stringify(apiNotice));
  }

  // private formatErrors(error: any) {
  //   return Observable.throw(error.json());
  // }
  //


  //
  // get (path: string, params: URLSearchParams = new URLSearchParams()): Observable<any> {
  //   return this.http.get(`${environment.api_url}${path}`, {headers: this.setHeaders(), search: params})
  //     .catch(this.formatErrors)
  //     .map((res: Response) => res.json());
  // }
  //
  //
  // put(path: string, body: Object = {}): Observable<any> {
  //   return this.http.put(
  //     `${environment.api_url}${path}`,
  //     JSON.stringify(body),
  //     {headers: this.setHeaders()}
  //   )
  //     .catch(this.formatErrors)
  //     .map((res: Response) => res.json());
  // }
  //
  // post(path: string, body: Object = {}): Observable<any> {
  //   return this.http.post(
  //     `${environment.api_url}${path}`,
  //     JSON.stringify(body),
  //     {headers: this.setHeaders()}
  //   )
  //     .catch(this.formatErrors)
  //     .map((res: Response) => res.json());
  // }
  //
  // delete(path): Observable<any> {
  //   return this.http.delete(
  //     `${environment.api_url}${path}`,
  //     {headers: this.setHeaders()}
  //   )
  //     .catch(this.formatErrors)
  //     .map((res: Response) => res.json());
  // }
}
