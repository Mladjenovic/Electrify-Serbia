import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IncidentsService } from 'src/app/services/incident.service';
import { RegistrationSignupService } from 'src/app/services/registration-signup.service';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-incident-new',
  templateUrl: './incident-new.component.html',
  styleUrls: ['./incident-new.component.scss'],
})
export class IncidentNewComponent implements OnInit {
  id: number = 0;
  canEdit: boolean = false;

  constructor(
    public service: IncidentsService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    public settings: SettingsService,
    public userService: RegistrationSignupService
  ) {}

  ngOnInit(): void {
    this.service.getData();
    if (
      localStorage.getItem('token') != null &&
      localStorage.getItem('user') != null
    ) {
      this.userService.userData = JSON.parse(
        localStorage.getItem('user') || '{}'
      );
    }

    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
    this.service.list.filter((item) => {
      if (item.id == this.id) {
        this.service.formData = item;
      }
    });
  }

  addressChange() {
    for (let item of this.settings.streets) {
      if (item.name === this.service.formData.address) {
        this.service.formData.priority = item.priority;
      }
    }
  }

  save() {
    this.canEdit = false;
    this.service.getVersion(this.service.formData.id).subscribe((res) => {
      let v = res as number;
      if (v != this.service.formData.version) {
        if (
          confirm(
            'Someone already updated item. Do you want to overwrite item?'
          )
        ) {
          this.service.putData().subscribe((res) => {
            this.toastr.info('Succesfuly edited', 'Incident Info');
            this.service.getData();
            this.service
              .getVersion(this.service.formData.id)
              .subscribe((res) => {
                this.service.formData.version = res as number;
              });
          });
        }
      } else {
        this.service.putData().subscribe((res) => {
          this.toastr.info('Succesfuly edited', 'Incident Info');
          this.service.getData();
          this.service.getVersion(this.service.formData.id).subscribe((res) => {
            this.service.formData.version = res as number;
          });
        });
      }
    });
  }

  edit() {
    this.canEdit = true;
  }
  changePath(path: string) {
    if (path === 'new') {
      this.router.navigateByUrl(`incident/${this.id}/new`);
    } else if (path === 'element') {
      this.router.navigateByUrl(`incident/${this.id}/element`);
    } else if (path === 'resolution') {
      this.router.navigateByUrl(`incident/${this.id}/resolution`);
    } else if (path === 'call') {
      this.router.navigateByUrl(`incident/${this.id}/call`);
    } else if (path === 'multimedia') {
      this.router.navigateByUrl(`incident/${this.id}/multimedia`);
    } else if (path === 'crew') {
      this.router.navigateByUrl(`incident/${this.id}/crew`);
    }
  }
}
