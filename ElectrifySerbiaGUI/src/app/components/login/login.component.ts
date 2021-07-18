import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationSignupService } from 'src/app/services/registration-signup.service';
import { ToastrService } from 'ngx-toastr';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CallsService } from 'src/app/services/calls.service';
import { SettingsService } from 'src/app/services/settings.service';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { Call } from 'src/app/models/call.model';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    public service: RegistrationSignupService,
    private router: Router,
    private toastr: ToastrService,
    private modalService: NgbModal,
    public callService: CallsService,
    public settings: SettingsService,
    private readonly titleService: Title
  ) {
    const title = 'Sign In - Electrify Serbia';
    this.titleService.setTitle(title);
  }

  ngOnInit(): void {
    if (
      localStorage.getItem('token') != null &&
      localStorage.getItem('user') != null
    ) {
      this.service.userData = JSON.parse(localStorage.getItem('user') || '{}');
      this.router.navigateByUrl('/dashboard');
    }
  }

  addressChange() {
    for (let item of this.settings.streets) {
      if (item.name === this.callService.formData.address) {
        this.callService.formData.priority = item.priority;
      }
    }
  }

  onSubmit(form: NgForm) {
    this.service.getUser().subscribe(
      (res: any) => {
        localStorage.setItem('token', res.token);

        this.service
          .getProfileInfo(this.service.userData.email)
          .subscribe((res) => {
            this.service.userData = res as User;
            this.service.userData.loggedin = true;
            localStorage.setItem('user', JSON.stringify(this.service.userData));
            this.router.navigateByUrl('/dashboard');
          });
      },
      (err) => {
        if (err.status == 400)
          alert(
            'Incorrect username or password.'
          );
        else console.log(err);
      }
    );
  }

  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then((result) => {});
  }

  report() {
    this.modalService.dismissAll('Save click');
    this.callService.postData().subscribe((res) => {
      this.toastr.info('Succesfuly reported', 'Report info');
      this.callService.formData = new Call(0, '', '', '', '');
    });
  }
}
