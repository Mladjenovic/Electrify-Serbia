import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user.model';
import { RegistrationSignupService } from 'src/app/services/registration-signup.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { ConsumerService } from 'src/app/services/consumer.service';
import { Consumer } from 'src/app/models/consumer.model';
@Component({
  selector: 'app-consumers',
  templateUrl: './consumers.component.html',
  styleUrls: ['./consumers.component.scss']
})
export class ConsumersComponent implements OnInit {

  // usersList: User[] = [];
  constructor(public userService: RegistrationSignupService, private toastr : ToastrService,
    private titleService : Title, private modalService: NgbModal, public consumerService : ConsumerService) {
      const title = 'Consumers - Electrify Serbia';
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

    // this.consumerService.getAllUsers();
  }

  open(content: any, action?: Element) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then((result) => {});
  }

  save(form: NgForm) {
    this.consumerService.postUser().subscribe((res) => {
      form.form.reset();
      this.toastr.success('Successfully registred', 'Registration');
      this.consumerService.getData("Consumer");
      this.consumerService.userData = new Consumer();
    });
  }
  onImageChange(e: any) {
    if (e.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.consumerService.userData.image = event.target.result;
      };
    }
  }

}
