import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegistrationSignupService } from 'src/app/services/registration-signup.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(
    public service: RegistrationSignupService,
    private router: Router,
    private toastr: ToastrService,
    private readonly titleService: Title
  ) {
    const title = 'Sign Up - Electrify Serbia';
    this.titleService.setTitle(title);
  }


  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    this.service.postUser().subscribe((res) => {
      form.form.reset();
      this.toastr.success('Successfully registred', 'Registration');
      this.router.navigateByUrl('/login');
    });
  }
  onImageChange(e: any) {
    if (e.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.service.userData.image = event.target.result;
      };
    }
  }


}
