import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';

import {FullComponent} from './layouts/full/full.component';

import {NavigationComponent} from './shared/header-navigation/navigation.component';
import {SidebarComponent} from './shared/sidebar/sidebar.component';
import {BreadcrumbComponent} from './shared/breadcrumb/breadcrumb.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule} from 'ngx-perfect-scrollbar';

import {Approutes} from './app-routing.module';
import {AppComponent} from './app.component';
import {SpinnerComponent} from './shared/spinner.component';
import {MatDatepickerModule, MatInputModule, MatSortModule, MatTableModule} from '@angular/material';
import {MatIconModule} from '@angular/material/icon';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
// import ngx-translate and the http loa, TranslateCompilerder
import {TranslateCompiler, TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateMessageFormatCompiler} from 'ngx-translate-messageformat-compiler';
import {AngularFontAwesomeModule} from "angular-font-awesome";
import {CalendarModule} from "angular-calendar";
import {NgMaterialMultilevelMenuModule} from 'ng-material-multilevel-menu';
import {AlertModule} from 'ngx-bootstrap';
import {PasswordComponent} from "./password/password.component";

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 2,
  wheelPropagation: true
};

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    FullComponent,
    NavigationComponent,
    BreadcrumbComponent,
    SidebarComponent,
    LoginComponent,
    RegisterComponent,
    PasswordComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(Approutes),
    PerfectScrollbarModule,
    MatInputModule,
    MatSortModule,
    MatDatepickerModule,
    HttpClientModule,
    MatTableModule,
    MatIconModule,
    AngularFontAwesomeModule,
    NgMaterialMultilevelMenuModule,
    AlertModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      compiler: {
        provide: TranslateCompiler,
        useClass: TranslateMessageFormatCompiler
      }
    }),
    CalendarModule


  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http,'./assets/i18n/','.json');
}
