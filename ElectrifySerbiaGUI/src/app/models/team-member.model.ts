import { User } from './user.model';

export class TeamMember {
  id: number = 0;
  email: string = '';
  name: string = '';
  surName: string = '';
  userName: string = '';
  nameOfTeam: string = '';

  constructor(user: User) {
    this.name = user.name;
    this.userName = user.username;
    this.email = user.email;
    this.surName = user.surname;
    this.nameOfTeam = user.nameOfTeam;
  }
}
