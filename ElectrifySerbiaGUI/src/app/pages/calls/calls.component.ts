import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Call } from 'src/app/models/call.model';
import { User } from 'src/app/models/user.model';
import { CallsService } from 'src/app/services/calls.service';
import { RegistrationSignupService } from 'src/app/services/registration-signup.service';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-calls',
  templateUrl: './calls.component.html',
  styleUrls: ['./calls.component.scss'],
})
export class CallsComponent implements OnInit {
  isSelect: boolean = false;
  p: number = 0;
  selectedUser: string = '';
  users : User[] = [];
  constructor(
    public service: CallsService,
    private toastr: ToastrService,
    private modalService: NgbModal,
    public userService: RegistrationSignupService,
    public settings: SettingsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (
      localStorage.getItem('token') != null &&
      localStorage.getItem('user') != null
    ) {
      this.userService.userData = JSON.parse(
        localStorage.getItem('user') || '{}'
      );
    }
    this.service.getData();
  }

  addressChange() {
    for (let item of this.settings.streets) {
      if (item.name === this.service.formData.address) {
        this.service.formData.priority = item.priority;
      }
    }
  }
  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' })
      .result.then((result) => {});
    this.service.formData.priority = 0;
    this.service.formData.name = '';
    this.service.formData.surName = '';
  }

  select() {
    this.isSelect = true;
    this.users = [];
    this.userService.usersList.filter(item => {
      if(item.email === this.userService.userData.email){
        this.users.push(item);
      }
    });
  }
  ok() {
    this.isSelect = false;
    for (let item of this.userService.usersList) {
      if (item.email === this.selectedUser) {
        this.service.formData.name = item.name;
        this.service.formData.surName = item.surname;
        this.service.formData.address = item.address;
        for (let item of this.settings.streets) {
          if (item.name === this.service.formData.address) {
            this.service.formData.priority = item.priority;
            break;
          }
        }
        this.selectedUser = '';
        break;
      }
    }
  }
  report() {
    this.modalService.dismissAll('Save click');
    this.service.postData().subscribe((res) => {
      this.service.getData();
      this.toastr.info('Succesfuly reported', 'Report info');
      this.service.formData = new Call(0, '', '', '', '');
    });
  }
  delete(item: Call) {
    this.service.deleteData(item.id).subscribe((res) => {
      this.service.getData();
      this.toastr.info('Successfuly deleted', 'Call Info');
    });
  }
}
