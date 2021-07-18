import { Component, OnInit } from '@angular/core';
import { RegistrationSignupService } from 'src/app/services/registration-signup.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserTypeModel } from 'src/app/models/userType.model';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  userTypes = new UserTypeModel();
  constructor(public userService : RegistrationSignupService, private toastr: ToastrService,
    private titleService : Title) { 
    const title = 'Change data - Electrify Serbia';
    this.titleService.setTitle(title);
  }
  ngOnInit(): void {
    this.userService.userData = JSON.parse(localStorage.getItem('user') || '{}');

  }

  changePasswordSubmit(form: NgForm) {
    var oldPw = form.controls['oldPass'].value;
    var newPw = form.controls['newPass'].value;
    var newPassConf = form.controls['newPassConf'].value;
    if(newPw == newPassConf){
      this.userService.editUserPassword(this.userService.userData.email, oldPw, newPw).subscribe((res: any) => {
        form.form.reset();
        this.toastr.success('Successfully changed password');
      },
      (err) => {
        if (err.status == 400)
          this.toastr.error(
            'The old password was incorrect'
          );
        else console.log(err);
        });
    } else {
      this.toastr.error(
        'Please make sure that password and confirm password match'
      );
    }
    
  }

  editUserInfoSubmit(form: NgForm){
    this.userService.userData.address = form.controls['address'].value != '' ? form.controls['address'].value : this.userService.userData.address;
    this.userService.userData.name = form.controls['firstName'].value != '' ? form.controls['firstName'].value : this.userService.userData.name;
    this.userService.userData.surname = form.controls['lastname'].value != '' ? form.controls['lastname'].value : this.userService.userData.surname;
    this.userService.userData.phoneNumber = form.controls['phoneNo'].value != '' ? form.controls['phoneNo'].value : this.userService.userData.phoneNumber;
    this.userService.
    editUser(this.userService.userData.email, this.userService.userData.address,
      this.userService.userData.name, this.userService.userData.surname, this.userService.userData.phoneNumber,
       this.userService.userData.image, this.userService.userData.userType).subscribe((res : any) => {
      this.toastr.success('Your changes were saved successfully');
    })
    localStorage.setItem('user', JSON.stringify(this.userService.userData));
  }
  onImageChange(e: any) {
    if (e.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.userService.userData.image = event.target.result;
      };
    }
  }

  onTypeChange(deviceValue : any) {
    this.userService.userData.userType = deviceValue.target.value;
  }

}
