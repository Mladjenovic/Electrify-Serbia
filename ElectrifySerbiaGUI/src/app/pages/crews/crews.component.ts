import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Crew } from 'src/app/models/crew.model';
import { TeamMember } from 'src/app/models/team-member.model';
import { CrewsService } from 'src/app/services/crews.service';
import { RegistrationSignupService } from 'src/app/services/registration-signup.service';

@Component({
  selector: 'app-crews',
  templateUrl: './crews.component.html',
  styleUrls: ['./crews.component.scss'],
})
export class CrewsComponent implements OnInit {
  p: number = 0;
  constructor(
    public service: CrewsService,
    private modalService: NgbModal,
    public userService: RegistrationSignupService
  ) {}

  ngOnInit(): void {
    this.service.getData();
    this.userService.getData();
  }

  onChange(e: any, user: TeamMember) {
    if (e.target.checked) {
      this.service.formData.members.push(user);
    } else {
      this.service.formData.members = this.service.formData.members.filter(
        (item) => item.email != user.email
      );
    }
  }
  find(email: string) {
    for (let item of this.service.formData.members) {
      if (item.email === email) {
        return true;
      }
    }
    return false;
  }
  open(content: any, crew?: Crew) {
    if (crew) {
      this.service.formData = Object.assign({}, crew);
    } else {
      this.service.formData = new Crew();
    }
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then((result) => {});
  }

  delete(id: number) {
    this.service.deleteData(id).subscribe((res) => {
      this.service.getData();
    });
  }
  save() {
    this.modalService.dismissAll('Save click');
    if (this.service.formData.id === 0) {
      this.service.postData().subscribe((res) => {
        this.service.getData();
      });
    } else {
      this.service.putData().subscribe((res) => {
        this.service.getData();
      });
    }
  }
}
