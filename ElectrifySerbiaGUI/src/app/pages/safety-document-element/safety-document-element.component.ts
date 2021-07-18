import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Element } from 'src/app/models/element.model';
import { ElementsService } from 'src/app/services/elements.service';
import { RegistrationSignupService } from 'src/app/services/registration-signup.service';
import { SafetyDocsService } from 'src/app/services/safety-docs.service';

@Component({
  selector: 'app-safety-document-element',
  templateUrl: './safety-document-element.component.html',
  styleUrls: ['./safety-document-element.component.scss'],
})
export class SafetyDocumentElementComponent implements OnInit {
  p: number = 0;
  id: number = 0;

  constructor(
    public service: SafetyDocsService,
    private route: ActivatedRoute,
    private router: Router,
    public elementService: ElementsService,
    private modalService: NgbModal,
    public userService: RegistrationSignupService,
    private toastr: ToastrService
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
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
    this.service.list.filter((item) => {
      if (item.id == this.id) {
        this.service.formData = item;
      }
    });
  }

  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
      .result.then((result) => {});
  }
  onChange(element: Element) {
    this.service.postDataElement(element).subscribe((res) => {
      this.service.formData.elements.push(element);
      this.toastr.success('Succesfuly added', 'Document Info');
    });
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
  save() {
    this.modalService.dismissAll();
  }
  delete(id: number) {
    if (confirm('Do you want to delete item?')) {
      this.service.deleteDataElement(id).subscribe((res) => {
        this.service.formData.elements = this.service.formData.elements.filter(
          (item) => item.id !== id
        );
        this.toastr.info('Succesfuly deleted', 'Document Info');
      });
    }
  }
  changePath(path: string) {
    if (path === 'new') {
      this.router.navigateByUrl(`safetydocs/${this.id}/new`);
    } else if (path === 'element') {
      this.router.navigateByUrl(`safetydocs/${this.id}/element`);
    } else if (path === 'history') {
      this.router.navigateByUrl(`safetydocs/${this.id}/history`);
    } else if (path === 'multimedia') {
      this.router.navigateByUrl(`safetydocs/${this.id}/multimedia`);
    } else if (path === 'checklist') {
      this.router.navigateByUrl(`safetydocs/${this.id}/checklist`);
    } else if (path === 'crew') {
      this.router.navigateByUrl(`incident/${this.id}/crew`);
    }
  }
}
