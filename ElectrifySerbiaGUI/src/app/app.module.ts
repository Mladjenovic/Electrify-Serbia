import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { IncidentsComponent } from './pages/incidents/incidents.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxDropzoneModule } from 'ngx-dropzone';

import { MaterialModule } from './material/material.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { RegistrationSignupService } from './services/registration-signup.service';
import { AuthInterceptor } from './guards/auth.interceptor';
import { DatePipe } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { IncidentNewComponent } from './pages/incident-new/incident-new.component';
import { IncidentElementComponent } from './pages/incident-element/incident-element.component';
import { IncidentResolutionComponent } from './pages/incident-resolution/incident-resolution.component';
import { IncidentCallComponent } from './pages/incident-call/incident-call.component';
import { IncidentCrewComponent } from './pages/incident-crew/incident-crew.component';
import { IncidentMultimediaComponent } from './pages/incident-multimedia/incident-multimedia.component';
import { ElementsComponent } from './pages/elements/elements.component';
import { CrewsComponent } from './pages/crews/crews.component';
import { SafetyDocumentsComponent } from './pages/safety-documents/safety-documents.component';
import { SafetyDocumentNewComponent } from './pages/safety-document-new/safety-document-new.component';
import { CallsComponent } from './pages/calls/calls.component';
import { SafetyDocumentElementComponent } from './pages/safety-document-element/safety-document-element.component';
import { SafetyDocumentHistoryComponent } from './pages/safety-document-history/safety-document-history.component';
import { SafetyDocumentMultimediaComponent } from './pages/safety-document-multimedia/safety-document-multimedia.component';
import { SafetyDocumentChecklistComponent } from './pages/safety-document-checklist/safety-document-checklist.component';
import { SettingsComponent } from './components/settings/settings.component';
import { ConsumersComponent } from './pages/consumers/consumers.component';
import { WorkplansComponent } from './pages/workplans/workplans.component';
// import { NotificationsComponent } from './pages/notifications/notifications.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    IncidentsComponent,
    IncidentNewComponent,
    IncidentElementComponent,
    IncidentResolutionComponent,
    IncidentCallComponent,
    IncidentCrewComponent,
    IncidentMultimediaComponent,
    ElementsComponent,
    CrewsComponent,
    SafetyDocumentsComponent,
    SafetyDocumentNewComponent,
    CallsComponent,
    SafetyDocumentElementComponent,
    SafetyDocumentHistoryComponent,
    SafetyDocumentMultimediaComponent,
    SafetyDocumentChecklistComponent,
    SettingsComponent,
    ConsumersComponent,
    WorkplansComponent,
    
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    NgxPaginationModule,
    NgbModule,
    NgxDropzoneModule,
  ],
  providers: [
    Title,
    RegistrationSignupService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    DatePipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
