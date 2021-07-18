import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Incident } from '../models/incident.model';
import { Element } from '../models/element.model'
import { HttpClient } from '@angular/common/http';
import { Call } from '../models/call.model';
import { Resolution } from '../models/resolution.model';
import { Crew } from '../models/crew.model';
import { Multimedia } from '../models/multimedia.model';
import { MultimediaIncident } from '../models/multimedia-incident.model';
import { DashIncident } from '../models/dash-incident.model';
@Injectable({
  providedIn: 'root'
})
export class IncidentsService {
  readonly baseUrl = 'https://localhost:44359/api/Incidents';
  list : Incident[] = [];
  searchList : Incident[] = [];
  formData : Incident = new Incident();
  selectedIncident : Incident = new Incident();
  elements : Element[] = [];
  incident : DashIncident = new DashIncident();
  constructor(private http : HttpClient) {
    this.getData();
  }
  getData(){
    this.http.get(`${this.baseUrl}`).toPromise().then(res => {
      this.list = res as Incident[];
      this.searchList = res as Incident[];
      this.incident.allIncidents = this.list.length;
      this.incident.drafts = this.list.filter(item => item.status==='Drafted').length;
      this.incident.canceled = this.list.filter(item => item.status==='Canceled').length;
      this.incident.executing = this.list.filter(item => item.status==='Executing').length;
      this.incident.completed = this.list.filter(item => item.status==='Complited').length;

    });
    return this.incident;
  }
  getVersion(id : number){
    return this.http.get(`${this.baseUrl}/${id}/version`);
  }
  postData(){
    return this.http.post(`${this.baseUrl}`,this.formData);
  };
  postDataElement(element : Element){
    return this.http.post(`${this.baseUrl}/${this.formData.id}/devices`,element);
  }
  postDataCall(call : Call){
    return this.http.post(`${this.baseUrl}/${this.formData.id}/calls`,call);
  }
  postDataResolution(resolution : Resolution){
    return this.http.post(`${this.baseUrl}/${this.formData.id}/resolutions`,resolution);
  }
  postDataCrew(crew : Crew){
    return this.http.post(`${this.baseUrl}/${this.formData.id}/crew`,crew);
  }
  postDataMultimedia(multimedia : MultimediaIncident){
    return this.http.post(`${this.baseUrl}/${this.formData.id}/multimedia`,multimedia);
  }
  putData(){
    return this.http.put(`${this.baseUrl}/${this.formData.id}`,this.formData);
  }
  deleteData(id : number){
    return this.http.delete(`${this.baseUrl}/${id}`)
  }
  deleteDataElement(elementId : number){
    return this.http.delete(`${this.baseUrl}/${this.formData.id}/${elementId}/devices`);
  }
  deleteDataCall(callId : number){
    return this.http.delete(`${this.baseUrl}/${this.formData.id}/${callId}/calls`);
  }
  deleteDataResolution(resolutionId : number){
    return this.http.delete(`${this.baseUrl}/${this.formData.id}/${resolutionId}/resolutions`);
  }
  deleteDataMultimedia(multimediaId : number){
    return this.http.delete(`${this.baseUrl}/${this.formData.id}/${multimediaId}/multimedia`);
  }
}
