import { Injectable } from '@angular/core';

@Injectable()
export class CoreService {

  constructor() { }
  public baseUrl: string = "http://localhost:8200";
  public apiUrl: string ="http://licenserenewalservice-env.2qcm7emnen.ap-southeast-2.elasticbeanstalk.com/notices";
}
