import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Incident } from 'src/app/models/incident.model';
import { IncidentsService } from 'src/app/services/incident.service';
import { RegistrationSignupService } from 'src/app/services/registration-signup.service';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-incidents',
  templateUrl: './incidents.component.html',
  styleUrls: ['./incidents.component.scss'],
})
export class IncidentsComponent implements OnInit {
  p: number = 0;
  filter: string = 'All';
  searchType: string = '';
  searchStatus: string = '';
  reverse: boolean = false;
  tempList: Incident[] = [];

  constructor(
    public service: IncidentsService,
    public modalService: NgbModal,
    private router: Router,
    public userService: RegistrationSignupService,
    private toastr: ToastrService,
    public settings: SettingsService
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

  search() {
    if (this.filter === 'All') {
      this.service.list = this.service.searchList.filter(
        (item) =>
          item.status.match(this.searchStatus) &&
          item.type.match(this.searchType)
      );
    } else if (this.filter === 'Mine') {
      this.service.list = this.service.searchList.filter(
        (item) =>
          item.status.match(this.searchStatus) &&
          item.type.match(this.searchType) &&
          item.creator === this.userService.userData.email
      );
    }
  }
  reset() {
    if (this.filter === 'All') this.service.list = this.service.searchList;
    else if (this.filter === 'Mine')
      this.service.list = this.service.searchList.filter(
        (item) => item.creator === this.userService.userData.email
      );
    this.searchType = '';
    this.searchStatus = '';
  }

  filterChange() {
    if (this.filter === 'Mine') {
      this.service.list = this.service.searchList.filter(
        (item) => item.creator === this.userService.userData.email
      );
    } else {
      this.service.list = this.service.searchList;
    }
  }

  open(content: any) {
    this.service.formData = new Incident();
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' })
      .result.then((result) => {});
  }

  save() {
    this.modalService.dismissAll('Save click');
    this.service.formData.creator = this.userService.userData.email;
    this.service.postData().subscribe((res) => {
      this.toastr.success('Successfully added', 'Incident Info');
      this.service.getData();
      this.service.formData = new Incident();
    });
  }
  details(item: Incident) {
    this.router.navigateByUrl(`incident/${item.id}/new`);
  }
  delete(item: Incident) {
    if (confirm('Do you want to delete item?')) {
      this.service.deleteData(item.id).subscribe((res) => {
        this.toastr.info('Successfully deleted', 'Incident Info');
        this.service.getData();
      });
    }
  }

  sort(header: string) {
    this.reverse = !this.reverse;
    if (header === 'type') {
      if (this.reverse) {
        this.service.list = this.service.list.sort((a, b) =>
          a.type > b.type ? 1 : -1
        );
      } else {
        this.service.list = this.service.list.sort((a, b) =>
          a.type < b.type ? 1 : -1
        );
      }
    } else if (header === 'id') {
      if (this.reverse) {
        this.service.list = this.service.list.sort((a, b) =>
          a.id > b.id ? 1 : -1
        );
      } else {
        this.service.list = this.service.list.sort((a, b) =>
          a.id < b.id ? 1 : -1
        );
      }
    } else if (header === 'priority') {
      if (this.reverse) {
        this.service.list = this.service.list.sort((a, b) =>
          a.priority > b.priority ? 1 : -1
        );
      } else {
        this.service.list = this.service.list.sort((a, b) =>
          a.priority < b.priority ? 1 : -1
        );
      }
    } else if (header === 'address') {
      if (this.reverse) {
        this.service.list = this.service.list.sort((a, b) =>
          a.address > b.address ? 1 : -1
        );
      } else {
        this.service.list = this.service.list.sort((a, b) =>
          a.address < b.address ? 1 : -1
        );
      }
    } else if (header === 'voltage') {
      if (this.reverse) {
        this.service.list = this.service.list.sort((a, b) =>
          a.voltage > b.voltage ? 1 : -1
        );
      } else {
        this.service.list = this.service.list.sort((a, b) =>
          a.voltage < b.voltage ? 1 : -1
        );
      }
    } else if (header === 'timeOfIncident') {
      if (this.reverse) {
        this.service.list = this.service.list.sort((a, b) =>
          a.timeOfIncident > b.timeOfIncident ? 1 : -1
        );
      } else {
        this.service.list = this.service.list.sort((a, b) =>
          a.timeOfIncident < b.timeOfIncident ? 1 : -1
        );
      }
    } else if (header === 'status') {
      if (this.reverse) {
        this.service.list = this.service.list.sort((a, b) =>
          a.status > b.status ? 1 : -1
        );
      } else {
        this.service.list = this.service.list.sort((a, b) =>
          a.status < b.status ? 1 : -1
        );
      }
    } else if (header === 'sheduleTime') {
      if (this.reverse) {
        this.service.list = this.service.list.sort((a, b) =>
          a.sheduledTime > b.sheduledTime ? 1 : -1
        );
      } else {
        this.service.list = this.service.list.sort((a, b) =>
          a.sheduledTime < b.sheduledTime ? 1 : -1
        );
      }
    } else if (header === 'etr') {
      if (this.reverse) {
        this.service.list = this.service.list.sort((a, b) =>
          a.etr > b.etr ? 1 : -1
        );
      } else {
        this.service.list = this.service.list.sort((a, b) =>
          a.etr < b.etr ? 1 : -1
        );
      }
    } else if (header === 'eta') {
      if (this.reverse) {
        this.service.list = this.service.list.sort((a, b) =>
          a.eta > b.eta ? 1 : -1
        );
      } else {
        this.service.list = this.service.list.sort((a, b) =>
          a.eta < b.eta ? 1 : -1
        );
      }
    } else if (header === 'ata') {
      if (this.reverse) {
        this.service.list = this.service.list.sort((a, b) =>
          a.ata > b.ata ? 1 : -1
        );
      } else {
        this.service.list = this.service.list.sort((a, b) =>
          a.ata < b.ata ? 1 : -1
        );
      }
    } else if (header === 'affected') {
      if (this.reverse) {
        this.service.list = this.service.list.sort((a, b) =>
          a.affectedConsumers > b.affectedConsumers ? 1 : -1
        );
      } else {
        this.service.list = this.service.list.sort((a, b) =>
          a.affectedConsumers < b.affectedConsumers ? 1 : -1
        );
      }
    } else if (header === 'calls') {
      if (this.reverse) {
        this.service.list = this.service.list.sort((a, b) =>
          a.calls > b.calls ? 1 : -1
        );
      } else {
        this.service.list = this.service.list.sort((a, b) =>
          a.calls < b.calls ? 1 : -1
        );
      }
    } else if (header === 'confirmed') {
      if (this.reverse) {
        this.service.list = this.service.list.sort((a, b) =>
          a.confirmed > b.confirmed ? 1 : -1
        );
      } else {
        this.service.list = this.service.list.sort((a, b) =>
          a.confirmed < b.confirmed ? 1 : -1
        );
      }
    }
  }
}
