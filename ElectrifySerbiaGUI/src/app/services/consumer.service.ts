import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Consumer } from '../models/consumer.model';

@Injectable({
    providedIn: 'root',
  })
  export class ConsumerService {
    userData: Consumer = new Consumer();
    usersList: Consumer[] = [];

    constructor(private http: HttpClient, private toastr: ToastrService) {
      this.getData("Consumer");
    }

    readonly registerUrl = 'https://localhost:44359/api/Authentication/register';
    readonly profileUrl = 'https://localhost:44359/api/Authentication';

    getData(type : string) {
      this.http
        .get(this.profileUrl + "?type="+ type )
        .toPromise()
        .then((res) => {
          this.usersList = res as Consumer[];
          
        });
    }
    postUser() {
        return this.http.post(this.registerUrl, this.userData);
    }

  }