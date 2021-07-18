import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Call } from 'src/app/models/call.model';
import { CallsService } from 'src/app/services/calls.service';
import { IncidentsService } from 'src/app/services/incident.service';
import { RegistrationSignupService } from 'src/app/services/registration-signup.service';

@Component({
  selector: 'app-incident-call',
  templateUrl: './incident-call.component.html',
  styleUrls: ['./incident-call.component.scss'],
})
export class IncidentCallComponent implements OnInit {
  p: number = 0;
  id: number = 0;
  calls : Call[] = [];
  constructor(
    public service: IncidentsService,
    public modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    public callService: CallsService,
    public userService: RegistrationSignupService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.service.getData();
    this.callService.getData();
    if (
      localStorage.getItem('token') != null &&
      localStorage.getItem('user') != null
    ) {
      this.userService.userData = JSON.parse(
        localStorage.getItem('user') || '{}'
      );
    }
    this.route.params.subscribe((params) => {
      this.id = parseInt(params['id']);
    });
    this.service.list.filter((item) => {
      if (item.id === this.id) {
        this.service.formData = item;
      }
    });

  }

  find(call: Call) {
    let retVal = false;
    for (var item of this.service.formData.call) {
      if (item.id == call.id) {
        retVal = true;
        break;
      }
    }
    return retVal;
  }
  onChange(call: Call) {
    this.service.postDataCall(call).subscribe((res) => {
      this.service.formData.call.push(call);
      this.toastr.success('Succesfuly added', 'Incident Info');
    });
  }
  add() {
    this.modalService.dismissAll('Save click');
  }
  delete(id: number) {
    if (confirm('Do you want to delete item?')) {
      this.service.deleteDataCall(id).subscribe((res) => {
        this.service.formData.call = this.service.formData.call.filter(
          (item) => item.id != id
        );
        this.toastr.info('Succesfuly deleted', 'Incident Info');
      });
    }
  }
  open(content: any) {
    this.calls = [];
    this.callService.list.filter(item => {
      if(item.address === this.service.formData.address){
        this.calls.push(item);
      }
    });
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' })
      .result.then((result) => {});
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
