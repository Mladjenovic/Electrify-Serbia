export class EditUserModel {
    email: string = '';
    address: string = '';
    name: string = '';
    surname: string = '';
    phoneNo : string = '';
    image : string = '';
    userType : string = '';
  
    constructor(email: string, address: string, name: string, surname: string, phoneNo: string, image : string, userType : string) {
      this.email = email;
      this.address = address;
      this.name = name;
      this.surname = surname;
      this.phoneNo = phoneNo;
      this.image = image;
      this.userType = userType;
    }
  }
  