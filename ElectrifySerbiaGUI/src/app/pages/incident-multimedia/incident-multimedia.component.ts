import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MultimediaIncident } from 'src/app/models/multimedia-incident.model';
import { Multimedia } from 'src/app/models/multimedia.model';
import { IncidentsService } from 'src/app/services/incident.service';
import { RegistrationSignupService } from 'src/app/services/registration-signup.service';

@Component({
  selector: 'app-incident-multimedia',
  templateUrl: './incident-multimedia.component.html',
  styleUrls: ['./incident-multimedia.component.scss'],
})
export class IncidentMultimediaComponent implements OnInit {
  files: File[] = [];
  id: number = 0;
  p: number = 0;
  url: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public service: IncidentsService,
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
      this.id = parseInt(params['id']);
    });
    this.service.list.filter((item) => {
      if (item.id === this.id) {
        this.service.formData = item;
      }
    });
  }

  delete(id: number) {
    if (confirm('Do you want do delete item?')) {
      this.service.deleteDataMultimedia(id).subscribe((res) => {
        this.service.formData.multimedia =
          this.service.formData.multimedia.filter((item) => item.id !== id);
        this.toastr.info('Succesfuly deleted', 'Incident Info');
      });
    }
  }
  onSelect(event: any) {
    this.files.push(...event.addedFiles);
  }
  upload() {
    for (var item of this.files) {
      var reader = new FileReader();
      reader.readAsDataURL(item);
      reader.onload = (event: any) => {
        let url = event.target.result;
        let multimedia = new MultimediaIncident();
        multimedia.url = url;
        const formData = new FormData();
        formData.append('file', item, item.name);
        this.service.postDataMultimedia(multimedia).subscribe((res) => {
          multimedia = res as Multimedia;
          this.service.formData.multimedia.push(multimedia);
          this.toastr.success('Succesfuly added', 'Incident Info');
        });
      };
    }
    this.files.splice(0, this.files.length);
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
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
