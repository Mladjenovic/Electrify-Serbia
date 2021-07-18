import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RegistrationSignupService } from 'src/app/services/registration-signup.service';
import { WorkplansService } from 'src/app/services/workplans.service';

@Component({
  selector: 'app-workplans',
  templateUrl: './workplans.component.html',
  styleUrls: ['./workplans.component.scss']
})
export class WorkplansComponent implements OnInit {

  constructor(public userService: RegistrationSignupService, public service : WorkplansService, private titleService : Title) { 
    const title = 'Workplans - Electrify Serbia';
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

    this.service.getAllWorkplans();
  }

}
