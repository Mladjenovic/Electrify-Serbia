export class User {
  userId: number = 0;
  username: string = '';
  email: string = '';
  password: string = '';
  name: string = '';
  surname: string = '';
  dateOfBirth: string = '';
  address: string = '';
  userType: string = '';
  nameOfTeam: string = '';
  image: string = '';
  loggedin: boolean = false;
  //did admin approve account
  approved: boolean = true;
  //consumer extra info
  priority: number = 0;
  accountID: string = '';
  accountType: string = '';
  phoneNumber: string = '';

  constructor(name?: string, surname?: string) {
    if (name && surname) {
      this.name = name;
      this.surname = surname;
    }
  }
}
