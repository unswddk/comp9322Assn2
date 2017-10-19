import {
  HttpRequest,
  HttpHandler,
  HttpEvent, HttpInterceptor, HttpResponse
} from '@angular/common/http';
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";
import {CoreService} from "./core.service";

@Injectable()
export class JWTInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService,
              private coreService:CoreService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const JWT = this.authService.getToken();
    if (JWT) {
      if (req.url === this.coreService.baseUrl + "/api/login") {
      } else {
        req = req.clone({
          setHeaders: {
            "x-auth-token": JWT,
          }
        });
        console.log(req);
      }
    }
    return next.handle(req);
  }
}
