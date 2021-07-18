import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Crew } from '../models/crew.model';

@Injectable({
  providedIn: 'root'
})
export class CrewsService {
  formData : Crew = new Crew();
  list : Crew[] = [];
  readonly baseUrl = 'https://localhost:44359/api/Crews';
  constructor(private http : HttpClient) {
    this.getData();
  }
  getData(){
    this.http.get(`${this.baseUrl}`).toPromise().then(res => {
      this.list = res as Crew[];
    });
  }
  postData(){
    return this.http.post(`${this.baseUrl}`,this.formData);
  }
  putData(){
    return this.http.put(`${this.baseUrl}/${this.formData.id}`,this.formData);
  }
  deleteData(id : number){
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
