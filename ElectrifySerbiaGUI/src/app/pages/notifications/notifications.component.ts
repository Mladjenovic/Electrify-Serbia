import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notifications.service';
import { RegistrationSignupService } from 'src/app/services/registration-signup.service';
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

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
  }
}
