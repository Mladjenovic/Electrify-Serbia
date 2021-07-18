import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { NotificationModel } from "../models/notification.model";

@Injectable({
    providedIn: 'root',
  })
export class NotificationService {
    notifications: NotificationModel[] = [];
    notification : NotificationModel = new NotificationModel();
    constructor(private http: HttpClient, private toastr: ToastrService) {
        
      }
    readonly baseUrl = "https://localhost:44359/api/Notifications"
    
    getData(email : string, type : string) {
    this.http
        .get(`${this.baseUrl}/${email}/${type}`)
        .toPromise()
        .then((res) => {
            this.notifications = res as NotificationModel[];
        });
    }

    editNotification(){
        return this.http.put(`${this.baseUrl}/${this.notification.id}`,this.notification);
      }
      
      getNotifications(){
        this.http.get(`${this.baseUrl}`).toPromise().then(res => {
          this.notifications = res as NotificationModel[];
        });
      }
}