import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegistrationSignupService } from 'src/app/services/registration-signup.service';
import { SafetyDocsService } from 'src/app/services/safety-docs.service';

@Component({
  selector: 'app-safety-document-checklist',
  templateUrl: './safety-document-checklist.component.html',
  styleUrls: ['./safety-document-checklist.component.scss'],
})
export class SafetyDocumentChecklistComponent implements OnInit {
  id: number = 0;
  canEdit: boolean = false;

  constructor(
    public service: SafetyDocsService,
    private route: ActivatedRoute,
    private router: Router,
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
    if (
      this.userService.userData.userType === 'Dispatcher' ||
      this.userService.userData.userType === 'TeamMember'
    ) {
      this.canEdit = true;
    } else {
      this.canEdit = false;
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
  change() {
    this.service.putData().subscribe((res) => {
      this.toastr.info('Succesfully edited', 'Document Info');
      this.service.getData();
    });
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
