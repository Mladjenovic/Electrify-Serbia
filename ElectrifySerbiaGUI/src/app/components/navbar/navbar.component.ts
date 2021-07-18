import { Component, OnInit } from '@angular/core';
import { RegistrationSignupService } from 'src/app/services/registration-signup.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public constructor(public service: RegistrationSignupService, public router: Router)
  {
   }

  ngOnInit() {
  }

  logout(){
    this.service.userData = new User();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigateByUrl('/login');
  }
 

}
