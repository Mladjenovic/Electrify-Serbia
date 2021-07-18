import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Resolution } from 'src/app/models/resolution.model';
import { IncidentsService } from 'src/app/services/incident.service';
import { RegistrationSignupService } from 'src/app/services/registration-signup.service';

@Component({
  selector: 'app-incident-resolution',
  templateUrl: './incident-resolution.component.html',
  styleUrls: ['./incident-resolution.component.scss'],
})
export class IncidentResolutionComponent implements OnInit {
  closeResult: string = '';
  p: number = 0;
  id: number = 0;
  formData: Resolution = new Resolution();
  constructor(
    public service: IncidentsService,
    public modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    public userService: RegistrationSignupService,
    private toastr: ToastrService
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
      if (item.id === this.id) {
        this.service.formData = item;
      }
    });
  }
  add() {
    this.modalService.dismissAll('Save click');
    this.service.postDataResolution(this.formData).subscribe((res) => {
      if (res != 0) {
        this.formData.id = res as number;
        this.service.formData.resolutions.push(this.formData);
        this.formData = new Resolution();
        this.toastr.success('Succesfuly added', 'Incident Info');
      }
    });
  }
  delete(id: number) {
    if (confirm('Do you want to delete item?')) {
      this.service.deleteDataResolution(id).subscribe((res) => {
        this.service.formData.resolutions =
          this.service.formData.resolutions.filter((item) => item.id !== id);
        this.toastr.info('Succesfuly deleted', 'Incident Info');
      });
    }
  }
  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then((result) => {});
    this.formData = new Resolution();
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
