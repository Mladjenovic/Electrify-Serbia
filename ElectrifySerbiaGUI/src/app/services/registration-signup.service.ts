import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { EditUserModel } from '../models/editUser.model';
import { LoginModel } from '../models/login-model.model';
import { PasswordChangeModel } from '../models/password-change.model';
import { TeamMember } from '../models/team-member.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class RegistrationSignupService {
  userData: User = new User();
  usersList: User[] = [];
  teamMembers: TeamMember[] = [];

  constructor(private http: HttpClient, private toastr: ToastrService) {
    this.getData();
  }

  readonly baseUrl = 'https://localhost:44359/api/Users';
  readonly url = 'https://localhost:44359/api/Authentication/register';
  readonly loginUrl = 'https://localhost:44359/api/Authentication/login';
  readonly editUrl = 'https://localhost:44359/api/Authentication/edit';
  readonly changePasswordUrl = 'https://localhost:44359/api/Authentication/changePassword';
  readonly consumerUrl = 'https://localhost:44359/api/Authentication/consumer';
  readonly profileUrl = 'https://localhost:44359/api/Authentication';

  postUser() {
    return this.http.post(this.url, this.userData);
  }

  editUserPassword(email : string, oldPw : string, newPw : string){
    return this.http.post(this.changePasswordUrl, new PasswordChangeModel(email, oldPw, newPw));
  }

  editUser(email: string, address: string, name: string, surname: string, phoneNo: string, image : string, userType : string){
    return this.http.post(this.editUrl, new EditUserModel(email, address, name, surname, phoneNo, image, userType));
  }

  putConsumer() {
    this.userData.password = 'Nekasifra123';
    return this.http.post(this.consumerUrl, this.userData);
  }

  getData() {
    this.http
      .get(this.profileUrl)
      .toPromise()
      .then((res) => {
        this.usersList = res as User[];
        this.teamMembers = [];
        for (let item of this.usersList) {
          if (item.userType == 'TeamMember') {
            this.teamMembers.push(new TeamMember(item));
          }
        }
      });
  }

  getUser() {
    return this.http.post(
      `${this.loginUrl}`,
      new LoginModel(this.userData.email, this.userData.password)
    );
  }

  getProfileInfo(email: string) {
    return this.http.get(`${this.profileUrl}/${email}`);
  }

  removeUser(email: string) {
    return this.http.delete(`${this.profileUrl}/${email}`);
  }

  
}
