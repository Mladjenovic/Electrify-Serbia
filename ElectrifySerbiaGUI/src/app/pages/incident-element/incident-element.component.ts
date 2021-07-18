import { Element } from '../../models/element.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ElementsService } from 'src/app/services/elements.service';
import { IncidentsService } from 'src/app/services/incident.service';
import { RegistrationSignupService } from 'src/app/services/registration-signup.service';

@Component({
  selector: 'app-incident-element',
  templateUrl: './incident-element.component.html',
  styleUrls: ['./incident-element.component.scss'],
})
export class IncidentElementComponent implements OnInit {
  p: number = 0;
  list: Element[] = [];
  id: number = 0;
  elements : Element[] = [];
  constructor(
    public service: IncidentsService,
    public modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    public elementService: ElementsService,
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
      this.id = parseInt(params['id']);
    });
    this.service.list.filter((item) => {
      if (item.id === this.id) {
        this.service.formData = item;
      }
    });
  }

  add() {
    this.modalService.dismissAll('Save click');
  }

  find(element: Element) {
    let retVal = false;
    for (var item of this.service.formData.elements) {
      if (item.id == element.id) {
        retVal = true;
        break;
      }
    }
    return retVal;
  }

  onChange(element: Element) {
    this.service.postDataElement(element).subscribe((res) => {
      this.service.formData.elements.push(element);
    });
  }
  delete(id: number) {
    if (confirm('Do you want to delete item?')) {
      this.service.deleteDataElement(id).subscribe((res) => {
        this.service.formData.elements = this.service.formData.elements.filter(
          (item) => item.id !== id
        );
      });
    }
  }
  open(content: any) {
    this.elements = [];
    this.elementService.list.filter(item => {
      if(item.address === this.service.formData.address){
        this.elements.push(item);
      }
    });
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
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
