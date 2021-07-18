import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Element } from '../models/element.model';
@Injectable({
  providedIn: 'root',
})
export class ElementsService {
  formData: Element = new Element();
  list: Element[] = [];
  searchList: Element[] = [];
  readonly baseUrl = 'https://localhost:44359/api/Elements';
  constructor(private http: HttpClient) {
    this.getData();

    this.list.push(new Element(1, 'element1', 'tip1', 'adresa1', 'x1', 'y1'));
    this.list.push(new Element(1, 'element2', 'tip2', 'adresa2', 'x2', 'y2'));
    this.list.push(new Element(1, 'element3', 'tip3', 'adresa3', 'x3', 'y3'));
  }

  postData() {
    return this.http.post(`${this.baseUrl}`, this.formData);
  }
  getVersion(id: number) {
    return this.http.get(`${this.baseUrl}/${id}/version`);
  }
  getData() {
    this.http
      .get(`${this.baseUrl}`)
      .toPromise()
      .then((res) => {
        this.list = res as Element[];
        this.searchList = res as Element[];
      });
  }
  deleteData(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  putData() {
    return this.http.put(`${this.baseUrl}/${this.formData.id}`, this.formData);
  }
}
