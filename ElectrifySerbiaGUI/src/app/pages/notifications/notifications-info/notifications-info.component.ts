import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NotificationModel } from 'src/app/models/notification.model';
import { NotificationService } from 'src/app/services/notifications.service';
import { RegistrationSignupService } from 'src/app/services/registration-signup.service';

@Component({
  selector: 'app-notifications-info',
  templateUrl: './notifications-info.component.html',
  styleUrls: ['./notifications-info.component.scss', '../notifications.component.scss']
})
export class NotificationsInfoComponent implements OnInit {

  constructor(public userService: RegistrationSignupService, public notifService : NotificationService,
    private titleService : Title) { 
      const title = 'Info Notifications - Electrify Serbia';
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

    this.notifService.getData(this.userService.userData.email, "Info");

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
