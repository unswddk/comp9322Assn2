import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {SigninComponent} from "./signin/signin.component";
import {RouterModule} from "@angular/router";
import {rootRouterConfig} from "./app.router";
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {
  MatButtonModule, MatCardModule, MatCheckboxModule, MatInputModule,
  MatProgressBarModule, MatGridListModule, MatToolbarModule, MatFormFieldModule
} from '@angular/material';
import {NoConflictStyleCompatibilityMode, MatStepperModule, MatTabsModule, MatTableModule, MatSortModule, MatIconModule,
  MatExpansionModule,
  MatDialogModule,
  MatTooltipModule} from '@angular/material';
import {HomeComponent} from "./home/home.component";
import {UserLoginService} from "./service/user-login.service";
import {HttpClientModule} from "@angular/common/http";
import {JwtService} from "./service/jwt.service";
import {CoreService} from "./service/core.service";
import {HeaderComponent} from "./layout/header.component";
import {FooterComponent} from "./layout/footer.component";
import {DriverComponent, DialogOverviewExampleDialog} from "./driver/driver.component";
import {ReactiveFormsModule} from '@angular/forms';
import {ApiService} from "./service/api.service";
import {SignupComponent} from "./signup/signup.component";
import {UserRegisterService} from "./service/user-register.service";
import {NoticeMainComponent} from "./notice-main/notice-main.component";
import {LicenseComponent} from "./license/license.component";
import {LicenseService} from "./service/license.service";
import {DialogOverviewRejectDialog, UpdateNoticeComponent} from "./update-notice/update-notice.component";
import {DialogOverviewExtendDialog, ExtendNoticeComponent} from "./extend-notice/extend-notice.component";
import {TotalNoticeComponent} from "./total-notice/total-notice.component";
import {SendNoticeComponent} from "./send-notice/send-notice.component";
import {AuthService} from "./service/auth.service";
import {UserLayoutComponent} from "./layout/user-layout.component";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {JWTInterceptor} from "./service/jwt.interceptor";
import {MatListModule} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    DriverComponent,
    NoticeMainComponent,
    SignupComponent,
    LicenseComponent,
    UpdateNoticeComponent,
    ExtendNoticeComponent,
    TotalNoticeComponent,
    DialogOverviewExampleDialog,DialogOverviewRejectDialog,DialogOverviewExtendDialog,
    SendNoticeComponent,UserLayoutComponent
  ],
  entryComponents: [DialogOverviewExampleDialog,DialogOverviewRejectDialog,DialogOverviewExtendDialog],

  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    BrowserAnimationsModule,MatIconModule, MatStepperModule, MatTabsModule,MatSortModule,MatListModule,
    BrowserModule, NoConflictStyleCompatibilityMode, MatGridListModule,MatTableModule,MatDialogModule,MatButtonModule, MatCardModule, MatCheckboxModule, MatInputModule,MatExpansionModule,MatTooltipModule,
    MatProgressBarModule, MatToolbarModule, MatFormFieldModule,
    RouterModule.forRoot(rootRouterConfig)
  ],
  providers: [
    UserLoginService,
    CoreService,
    JwtService,
    ApiService, UserRegisterService,
    LicenseService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JWTInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
