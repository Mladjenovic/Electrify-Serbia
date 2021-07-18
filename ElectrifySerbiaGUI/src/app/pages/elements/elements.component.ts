import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Element } from 'src/app/models/element.model';
import { ElementsService } from 'src/app/services/elements.service';
import { IncidentsService } from 'src/app/services/incident.service';
import { RegistrationSignupService } from 'src/app/services/registration-signup.service';
import { SafetyDocsService } from 'src/app/services/safety-docs.service';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-elements',
  templateUrl: './elements.component.html',
  styleUrls: ['./elements.component.scss'],
})
export class ElementsComponent implements OnInit {
  p: number = 0;
  searchType: string = '';
  searchName: string = '';
  searchAddress: string = '';
  searchId: string = '';
  reverse: boolean = true;

  constructor(
    public service: ElementsService,
    private modalService: NgbModal,
    public settings: SettingsService,
    private toastr: ToastrService,
    private incidentService: IncidentsService,
    private safetyDocService: SafetyDocsService,
    public userService: RegistrationSignupService
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
    this.settings.getStreets();
  }

  reset() {
    this.searchAddress = '';
    this.searchName = '';
    this.searchType = '';
    this.searchId = '';
    this.service.list = this.service.searchList;
  }
  search() {
    this.service.list = this.service.searchList.filter((item) => {
      return (
        item.type.match(this.searchType) &&
        item.name.match(this.searchName) &&
        item.address.match(this.searchAddress) &&
        (item.id.toString() === this.searchId || this.searchId === '')
      );
    });
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
    } else if (header === 'name') {
      if (this.reverse) {
        this.service.list = this.service.list.sort((a, b) =>
          a.name > b.name ? 1 : -1
        );
      } else {
        this.service.list = this.service.list.sort((a, b) =>
          a.name < b.name ? 1 : -1
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
    } else if (header === 'x') {
      if (this.reverse) {
        this.service.list = this.service.list.sort((a, b) =>
          a.x > b.x ? 1 : -1
        );
      } else {
        this.service.list = this.service.list.sort((a, b) =>
          a.x < b.x ? 1 : -1
        );
      }
    } else if (header === 'y') {
      if (this.reverse) {
        this.service.list = this.service.list.sort((a, b) =>
          a.y > b.y ? 1 : -1
        );
      } else {
        this.service.list = this.service.list.sort((a, b) =>
          a.y < b.y ? 1 : -1
        );
      }
    }
  }

  open(content: any, action?: Element) {
    if (action == null) this.service.formData = new Element();
    else {
      this.service.formData = Object.assign({}, action);
    }
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then((result) => {});
  }

  delete(id: number) {
    if (confirm('Do you want to delete item?')) {
      this.service.deleteData(id).subscribe((res) => {
        this.service.getData();
        this.safetyDocService.getData();
        this.incidentService.getData();
        this.toastr.success('Succesfuly deleted', 'Element Info');
      });
    }
  }

  save() {
    this.modalService.dismissAll('Save click');
    if (this.service.formData.id === 0) {
      this.service.postData().subscribe((res) => {
        this.toastr.success('Succesfully added', 'Devices Info');
        this.service.getData();
      });
    } else {
      this.service.getVersion(this.service.formData.id).subscribe((res) => {
        let v = res as number;
        if (v != this.service.formData.version) {
          if (
            confirm(
              'Someone already updated item. Do you want to overwrite item?'
            )
          ) {
            this.service.putData().subscribe((res) => {
              this.service.getData();
              this.safetyDocService.getData();
              this.incidentService.getData();
              this.service
                .getVersion(this.service.formData.id)
                .subscribe((res) => {
                  this.service.formData.version = res as number;
                });
              this.toastr.info('Succesfuly edited', 'Devices Info');
            });
          }
        } else {
          this.service.putData().subscribe((res) => {
            this.service.getData();
            this.safetyDocService.getData();
            this.incidentService.getData();
            this.service
              .getVersion(this.service.formData.id)
              .subscribe((res) => {
                this.service.formData.version = res as number;
              });
            this.toastr.info('Succesfuly edited', 'Devices Info');
          });
        }
      });
    }
  }
}
