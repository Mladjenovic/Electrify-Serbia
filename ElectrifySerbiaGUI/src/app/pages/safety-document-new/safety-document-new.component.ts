import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CrewsService } from 'src/app/services/crews.service';
import { RegistrationSignupService } from 'src/app/services/registration-signup.service';
import { SafetyDocsService } from 'src/app/services/safety-docs.service';

@Component({
  selector: 'app-safety-document-new',
  templateUrl: './safety-document-new.component.html',
  styleUrls: ['./safety-document-new.component.scss'],
})
export class SafetyDocumentNewComponent implements OnInit {
  id: number = 0;
  canEdit: boolean = false;

  constructor(
    public service: SafetyDocsService,
    private route: ActivatedRoute,
    private router: Router,
    public crewService: CrewsService,
    private toastr: ToastrService,
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
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
    this.service.list.filter((item) => {
      if (item.id == this.id) {
        this.service.formData = item;
      }
    });
  }

  Save() {
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
            this.toastr.info('Succesfully edited', 'Document Info');
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
          this.toastr.info('Succesfully edited', 'Document Info');
          this.service.getData();
          this.service.getVersion(this.service.formData.id).subscribe((res) => {
            this.service.formData.version = res as number;
          });
        });
      }
    });
  }
  Edit() {
    this.canEdit = true;
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
