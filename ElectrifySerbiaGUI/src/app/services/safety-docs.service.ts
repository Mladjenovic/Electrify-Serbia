import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DashSafetyDocument } from '../models/dash-safety-document.model';
import { SafetyDocument } from '../models/safety-document.model';
import { Element } from '../models/element.model';
import { HistoryInfo } from '../models/history-info.model';
import { Multimedia } from '../models/multimedia.model';
@Injectable({
  providedIn: 'root',
})
export class SafetyDocsService {
  readonly baseUrl = 'https://localhost:44359/api/SafetyDocuments';
  formData: SafetyDocument = new SafetyDocument();
  list: SafetyDocument[] = [];
  searchList: SafetyDocument[] = [];
  safetyDocs: DashSafetyDocument = new DashSafetyDocument();
  constructor(private http: HttpClient) {
    this.getData();
  }
  getData() {
    this.http
      .get(`${this.baseUrl}`)
      .toPromise()
      .then((res) => {
        this.list = res as SafetyDocument[];
        this.searchList = res as SafetyDocument[];
        this.safetyDocs.allDocuments = this.list.length;
        this.safetyDocs.drafts = this.list.filter(
          (item) => item.status === 'Drafted'
        ).length;
        this.safetyDocs.canceled = this.list.filter(
          (item) => item.status === 'Canceled'
        ).length;
        this.safetyDocs.executing = this.list.filter(
          (item) => item.status === 'Executing'
        ).length;
        this.safetyDocs.completed = this.list.filter(
          (item) => item.status === 'Complited'
        ).length;
      });
    return this.safetyDocs;
  }
  getVersion(id: number) {
    return this.http.get(`${this.baseUrl}/${id}/version`);
  }
  postData() {
    return this.http.post(`${this.baseUrl}`, this.formData);
  }
  postDataElement(element: Element) {
    return this.http.post(
      `${this.baseUrl}/${this.formData.id}/devices`,
      element
    );
  }
  postDataHistory(history: HistoryInfo) {
    return this.http.post(
      `${this.baseUrl}/${this.formData.id}/history`,
      history
    );
  }
  postDataMultimedia(multimedia: Multimedia) {
    return this.http.post(
      `${this.baseUrl}/${this.formData.id}/multimedia`,
      multimedia
    );
  }
  putData() {
    return this.http.put(`${this.baseUrl}/${this.formData.id}`, this.formData);
  }
  deleteData(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  deleteDataElement(elementId: number) {
    return this.http.delete(
      `${this.baseUrl}/${this.formData.id}/${elementId}/devices`
    );
  }
  deleteDataMultimedia(multimediaId: number) {
    return this.http.delete(
      `${this.baseUrl}/${this.formData.id}/${multimediaId}/multimedia`
    );
  }
}
