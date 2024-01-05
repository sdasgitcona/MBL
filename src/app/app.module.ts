import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorComponent } from './shared/error/error.component';

import { ToastModule } from 'primeng/toast';
// import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageService } from 'primeng/api';
import { AuthGuard } from './core/gaurds/auth.gaurd';
import { HttpClientModule } from '@angular/common/http';

import {Routes, RouterModule } from '@angular/router';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { UserIdleModule } from 'angular-user-idle';
import { PaymentRequestComponent } from './Payment_Request/payment-request/payment-request.component';

const routes: Routes=[];
@NgModule({
  declarations: [AppComponent, ErrorComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ToastModule,
    // ProgressSpinnerModule,
    UserIdleModule.forRoot({idle: 3600, timeout: 1800 , ping:60}),
    HttpClientModule,
    RouterModule,
    RouterModule.forRoot(routes, {useHash:true})
  ],
  providers: [
    MessageService,
    AuthGuard,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
