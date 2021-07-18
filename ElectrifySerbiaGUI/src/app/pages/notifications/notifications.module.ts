import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationsRoutingModule } from './notifications-routing.module';
import { NotificationsUnreadComponent } from './notifications-unread/notifications-unread.component';
import { NotificationsErrorsComponent } from './notifications-errors/notifications-errors.component';
import { NotificationsInfoComponent } from './notifications-info/notifications-info.component';
import { NotificationsSuccessComponent } from './notifications-success/notifications-success.component';
import { NotificationsWarningComponent } from './notifications-warning/notifications-warning.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

import { NotificationsComponent } from './notifications.component';
import { NotificationsAllComponent } from './notifications-all/notifications-all.component';

@NgModule({
  declarations: [
    NotificationsComponent,
    NotificationsUnreadComponent,
    NotificationsErrorsComponent,
    NotificationsInfoComponent,
    NotificationsSuccessComponent,
    NotificationsWarningComponent,
    NotificationsAllComponent,
  ],
  imports: [
    CommonModule,
    NotificationsRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    
  ]
})
export class NotificationsModule { }
