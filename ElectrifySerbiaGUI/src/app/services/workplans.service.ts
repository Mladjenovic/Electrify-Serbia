import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Workplan } from '../models/workplan.model';

@Injectable({
    providedIn: 'root',
  })
  export class WorkplansService {
    workplan: Workplan = new Workplan();
    workplans: Workplan[] = [];

    constructor(private http: HttpClient, private toastr: ToastrService) {
      this.getAllWorkplans();
    }

    readonly baseUrl = 'https://localhost:44359/api/Workplans/';

    getAllWorkplans() {
      this.http
        .get(this.baseUrl)
        .toPromise()
        .then((res) => {
          this.workplans = res as Workplan[];
        });
    }
    getWorkplansByEmail(username : string){
        this.http
        .get(`${this.baseUrl}/${username}`)
        .toPromise()
        .then((res) => {
          this.workplans = res as Workplan[];
          
        });
    }
    

  }