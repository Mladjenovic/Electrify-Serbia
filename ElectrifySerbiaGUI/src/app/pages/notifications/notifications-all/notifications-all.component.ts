import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NotificationModel } from 'src/app/models/notification.model';
import { NotificationService } from 'src/app/services/notifications.service';
import { RegistrationSignupService } from 'src/app/services/registration-signup.service';
@Component({
  selector: 'app-notifications-all',
  templateUrl: './notifications-all.component.html',
  styleUrls: ['../notifications.component.scss']
})
export class NotificationsAllComponent implements OnInit {

  constructor(public userService: RegistrationSignupService, public notifService : NotificationService,
    private titleService : Title, public router: Router) { 
      const title = 'My Notifications - Electrify Serbia';
      this.titleService.setTitle(title);
    }

  ngOnInit(): void {
    if (
      localStorage.getItem('token') != null &&
      localStorage.getItem('user') != null
    ) {
      this.userService.userData = JSON.parse(
        localStorage.getItem('user') || '{}'
      );
    }

    this.notifService.getData(this.userService.userData.email, "all");

  }

  readAll(){
    for (let item of this.notifService.notifications){
      if(item.isRead === false){
        item.isRead = true;

        this.notifService.notification = Object.assign({}, item);

        this.notifService.editNotification()
        .subscribe(res =>{
          this.notifService.getNotifications();
        });
      }
    }
  }

  readOne(item : NotificationModel){
    if(item.isRead === false){
      item.isRead = true;

      this.notifService.notification = Object.assign({}, item);

      this.notifService.editNotification()
      .subscribe(res =>{
        this.notifService.getNotifications();
      });
    }
  }
}
