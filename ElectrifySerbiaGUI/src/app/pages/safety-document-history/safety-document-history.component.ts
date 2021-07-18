import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HistoryInfo } from 'src/app/models/history-info.model';
import { RegistrationSignupService } from 'src/app/services/registration-signup.service';
import { SafetyDocsService } from 'src/app/services/safety-docs.service';

@Component({
  selector: 'app-safety-document-history',
  templateUrl: './safety-document-history.component.html',
  styleUrls: ['./safety-document-history.component.scss'],
})
export class SafetyDocumentHistoryComponent implements OnInit {
  id: number = 0;

  constructor(
    private router: Router,
    public service: SafetyDocsService,
    private route: ActivatedRoute,
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

  issue() {
    let history = new HistoryInfo('', 'Approved', '');
    history.email = this.userService.userData.email;
    this.service.postDataHistory(history).subscribe((res) => {
      history = res as HistoryInfo;
      this.service.formData.history.push(history);
      this.service.formData.state = 'Approved';
    });
  }
  cancel() {
    let history = new HistoryInfo('', 'Canceled', '');
    history.email = this.userService.userData.email;

    this.service.postDataHistory(history).subscribe((res) => {
      history = res as HistoryInfo;

      this.service.formData.history.push(history);
      this.service.formData.state = 'Canceled';
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
