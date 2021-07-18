import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DashIncident } from 'src/app/models/dash-incident.model';
import { DashSafetyDocument } from 'src/app/models/dash-safety-document.model';
import { IncidentsService } from 'src/app/services/incident.service';
import { RegistrationSignupService } from 'src/app/services/registration-signup.service';
import { SafetyDocsService } from 'src/app/services/safety-docs.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  incidents : DashIncident = new DashIncident();
  safetyDocs : DashSafetyDocument = new DashSafetyDocument();
  constructor(private readonly titleService: Title,
    private safetyDocsService : SafetyDocsService,
    private incidentsService : IncidentsService,
    private service : RegistrationSignupService,
    private router : Router
    ) {
    const title = 'Incidents - Electrify Serbia';
    this.titleService.setTitle(title);
  }

  ngOnInit(): void {
    if (localStorage.getItem('token') != null && localStorage.getItem('user') != null){
      this.service.userData =  JSON.parse(localStorage.getItem('user') || '{}');
      this.router.navigateByUrl('/dashboard');
    }

    this.incidents = this.incidentsService.getData();
    this.safetyDocs = this.safetyDocsService.getData();
  }

}
