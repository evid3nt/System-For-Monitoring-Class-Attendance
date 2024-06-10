// src/app/user.model.ts
export class UserDTO {
    id?: string;  // Angular koristi string za GUID
    firstName?: string;
    lastName?: string;
    userRole?: string;
    cardId?: string;
    email?: string;
    password?: string;

    constructor(firstName: string, lastName: string, userRole: string, id?: string, cardId?: string, email?: string, password?: string) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
      this.userRole = userRole;
      this.id = id;
      this.cardId = cardId;
      this.password = password;
    }
  }
  