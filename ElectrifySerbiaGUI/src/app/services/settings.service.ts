import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item } from '../models/item.model';
import { NotificationDocumentSettings } from '../models/notification-document-settings.model';
import { NotificationVisibility } from '../models/notification-visibility.model';
import { Street } from '../models/street.model';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  readonly streetsUrl = 'https://localhost:44359/api/Streets';
  readonly iconsUrl = 'https://localhost:44359/api/Icons';
  readonly notifVisibsUrl =
    'https://localhost:44359/api/NotificationVisibilities';

  street: Street = new Street();
  streets: Street[] = [];

  item: Item = new Item();
  items: Item[] = [];

  notifVisib: NotificationVisibility = new NotificationVisibility();
  notifVisibs: NotificationVisibility[] = [];

  test: string = '';

  notificationSettings: NotificationDocumentSettings =
    new NotificationDocumentSettings();

  constructor(private http: HttpClient) {
    this.getNotifVisibs().subscribe((res) => {
      this.notifVisibs = res as NotificationVisibility[];
      this.notificationSettings.enabledInfoNotif =
        this.notifVisibs[0].isVisible;
      this.notificationSettings.enabledSuccNotif =
        this.notifVisibs[1].isVisible;
      this.notificationSettings.enabledWarnNotif =
        this.notifVisibs[2].isVisible;
      this.notificationSettings.enabledErroNotif =
        this.notifVisibs[3].isVisible;
    });

    /*
    this.getIcons().subscribe((res) => {
      this.items = res as Item[];
    });


    this.notificationSettings.enabledInfoNotif = this.notifVisibs[0].isVisible;
    this.notificationSettings.enabledSuccNotif = this.notifVisibs[1].isVisible;
    this.notificationSettings.enabledWarnNotif = this.notifVisibs[2].isVisible;
    this.notificationSettings.enabledErroNotif = this.notifVisibs[3].isVisible;
    this.notificationSettings.enabledShowHide = true;
    */

    //this.test = this.notifVisibs[0].type;

    //this.getIcons();

    /*
    this.streets.push(new Street('Alekse Santica', 5));
    this.streets.push(new Street('Dr. Sime Milosevica', 10));
    this.streets.push(new Street('Maksima Gorkog', 4));
    this.streets.push(new Street('Presnerova', 8));
    this.streets.push(new Street('Radnicka', 3));

    */


    this.items.push(new Item(1, 'Incidents', 'warning', 'incident'));
    this.items.push(
      new Item(2, 'Work requests', 'description', 'workrequests')
    );
    this.items.push(new Item(3, 'Work plans', 'description', 'workplan'));
    this.items.push(
      new Item(4, 'Safety documents', 'description', 'safetydocs')
    );
    this.items.push(
      new Item(5, 'Notifications', 'notifications', 'notifications')
    );
    this.items.push(new Item(6, 'Map', 'map', 'map'));
    this.items.push(new Item(7, 'Elements', 'extension', 'element'));
    this.items.push(new Item(8, 'Crews', 'people', 'crew'));
    this.items.push(new Item(9, 'Consumers', 'people_outline', 'consumers'));
    this.items.push(new Item(10, 'Calls', 'call', 'call'));

    this.getStreets();
  }

  getStreets(){
    this.http.get(this.streetsUrl).toPromise().then(res => {
      this.streets = res as Street[];
    });
  }

  putStreet(){
    return this.http.put(`${this.streetsUrl}/${this.street.id}`, this.street);
  }

  getIcons(){
    this.http.get(this.iconsUrl).toPromise().then(res => {
      this.items = res as Item[];
    });

    return this.items;
  }

  putIcon(){
    return this.http.put(`${this.iconsUrl}/${this.item.id}`, this.item);
  }


  getNotifVisibs(){
    return this.http.get(this.notifVisibsUrl);
  }

  putNotifVisib(){
    return this.http.put(`${this.notifVisibsUrl}/${this.notifVisib.id}`, this.notifVisib);
  }

  reset(){
    this.items.splice(0, this.items.length);
    this.items.push(new Item(1, 'Incidents', 'warning', 'incident'));
    this.items.push(new Item(2, 'Work requests', 'description', 'workrequests'));
    this.items.push(new Item(3, 'Work plans', 'description', 'workplan'));
    this.items.push(new Item(4, 'Safety documents', 'description', 'safetydocs'));
    this.items.push(new Item(5, 'Notifications', 'notifications', 'notifications'));
    this.items.push(new Item(6, 'Map', 'map', 'map'));
    this.items.push(new Item(7, 'Elements', 'extension', 'element'));
    this.items.push(new Item(8, 'Crews', 'people', 'crew'));
    this.items.push(new Item(9, 'Consumers', 'people_outline', 'consumers'));
    this.items.push(new Item(10, 'Calls', 'call', 'call'));

    this.notificationSettings.enabledInfoNotif = true;
    this.notificationSettings.enabledSuccNotif = true;
    this.notificationSettings.enabledWarnNotif = true;
    this.notificationSettings.enabledErroNotif = true;
  }

}
