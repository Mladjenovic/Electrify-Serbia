import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Call } from '../models/call.model';

@Injectable({
  providedIn: 'root',
})
export class CallsService {
  formData: Call = new Call(0, '', '', '', '');
  list: Call[] = [];

  readonly baseUrl = 'https://localhost:44359/api/Calls';
  constructor(private http: HttpClient) {
    this.getData();
  }

  postData() {
    return this.http.post(`${this.baseUrl}`, this.formData);
  }
  getData() {
    this.http
      .get(`${this.baseUrl}`)
      .toPromise()
      .then((res) => {
        this.list = res as Call[];
      });
  }
  deleteData(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
