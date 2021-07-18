import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AuthGuard } from './guards/auth.guard';
import { ElementGuard } from './guards/element.guard';
import { CallsComponent } from './pages/calls/calls.component';
import { ConsumersComponent } from './pages/consumers/consumers.component';
import { CrewsComponent } from './pages/crews/crews.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ElementsComponent } from './pages/elements/elements.component';
import { IncidentCallComponent } from './pages/incident-call/incident-call.component';
import { IncidentCrewComponent } from './pages/incident-crew/incident-crew.component';
import { IncidentElementComponent } from './pages/incident-element/incident-element.component';
import { IncidentMultimediaComponent } from './pages/incident-multimedia/incident-multimedia.component';
import { IncidentNewComponent } from './pages/incident-new/incident-new.component';
import { IncidentResolutionComponent } from './pages/incident-resolution/incident-resolution.component';
import { IncidentsComponent } from './pages/incidents/incidents.component';
// import { NotificationsErrorsComponent } from './pages/notifications/notifications-errors/notifications-errors.component';
// import { NotificationsInfoComponent } from './pages/notifications/notifications-info/notifications-info.component';
// import { NotificationsSuccessComponent } from './pages/notifications/notifications-success/notifications-success.component';
// import { NotificationsUnreadComponent } from './pages/notifications/notifications-unread/notifications-unread.component';
// import { NotificationsWarningComponent } from './pages/notifications/notifications-warning/notifications-warning.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { SafetyDocumentChecklistComponent } from './pages/safety-document-checklist/safety-document-checklist.component';
import { SafetyDocumentElementComponent } from './pages/safety-document-element/safety-document-element.component';
import { SafetyDocumentHistoryComponent } from './pages/safety-document-history/safety-document-history.component';
import { SafetyDocumentMultimediaComponent } from './pages/safety-document-multimedia/safety-document-multimedia.component';
import { SafetyDocumentNewComponent } from './pages/safety-document-new/safety-document-new.component';
import { SafetyDocumentsComponent } from './pages/safety-documents/safety-documents.component';
import { NotificationsModule } from './pages/notifications/notifications.module';
import { WorkplansComponent } from './pages/workplans/workplans.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'incidents', component: IncidentsComponent, canActivate:[AuthGuard]},
  {path: 'dashboard', component: DashboardComponent},
  {path:'incident/:id/new', component:IncidentNewComponent, canActivate:[AuthGuard]},
  {path:'incident/:id/element', component:IncidentElementComponent, canActivate:[AuthGuard]},
  {path:'incident/:id/resolution', component: IncidentResolutionComponent, canActivate:[AuthGuard]},
  {path:'incident/:id/call', component: IncidentCallComponent, canActivate:[AuthGuard]},
  {path:'incident/:id/crew', component: IncidentCrewComponent, canActivate:[AuthGuard]},
  {path:'incident/:id/multimedia', component: IncidentMultimediaComponent, canActivate:[AuthGuard]},
  {path:'element', component:ElementsComponent, canActivate: [ElementGuard]},
  {path:'crew', component: CrewsComponent, canActivate:[AuthGuard]},
  {path:'call', component: CallsComponent,canActivate:[AuthGuard]},
  {path:'safetydocs', component: SafetyDocumentsComponent, canActivate:[AuthGuard]},
  {path:'safetydocs/:id/new', component: SafetyDocumentNewComponent, canActivate:[AuthGuard]},
  {path:'safetydocs/:id/element', component: SafetyDocumentElementComponent, canActivate:[AuthGuard]},
  {path:'safetydocs/:id/history', component: SafetyDocumentHistoryComponent, canActivate:[AuthGuard]},
  {path:'safetydocs/:id/multimedia', component: SafetyDocumentMultimediaComponent, canActivate:[AuthGuard]},
  {path:'safetydocs/:id/checklist', component: SafetyDocumentChecklistComponent, canActivate:[AuthGuard]},
  {path: 'settings', component: SettingsComponent},
  {path: 'consumers', component: ConsumersComponent},
  {path: 'workplans', component: WorkplansComponent},
  {path: 'notifications', loadChildren: () => import(`./pages/notifications/notifications.module`).then(m => m.NotificationsModule) },
  {path: '', component: LoginComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes,{ enableTracing: false })
],
exports: [RouterModule]
})
export class AppRoutingModule { }
