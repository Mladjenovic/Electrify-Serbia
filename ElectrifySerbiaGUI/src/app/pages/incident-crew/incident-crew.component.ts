import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Crew } from 'src/app/models/crew.model';
import { CrewsService } from 'src/app/services/crews.service';
import { IncidentsService } from 'src/app/services/incident.service';
import { RegistrationSignupService } from 'src/app/services/registration-signup.service';

@Component({
  selector: 'app-incident-crew',
  templateUrl: './incident-crew.component.html',
  styleUrls: ['./incident-crew.component.scss'],
})
export class IncidentCrewComponent implements OnInit {
  id: number = 0;
  crew: Crew = new Crew();

  constructor(
    public service: IncidentsService,
    public modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    public crewService: CrewsService,
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
        if (this.service.formData.crew == null)
          this.service.formData.crew = new Crew();
      }
    });
  }

  add() {
    this.modalService.dismissAll('Save click');
  }
  onChange(e: any, crew: Crew) {
    if (e.target.checked) {
      this.service.postDataCrew(crew).subscribe((res) => {
        this.service.formData.crew = crew;
      });
    } else this.service.formData.crew = new Crew();
  }

  open(content: any) {
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
