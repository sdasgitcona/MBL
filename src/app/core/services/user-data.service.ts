import { Injectable } from '@angular/core';
import { User } from 'src/app/core/models/user.model';

@Injectable({
  providedIn: 'root',
})
/**
 * user service class
 */
export class UserDataService {
  users: User[] = [];

  constructor() {
    // let user = {
    //   userId: 1,
    //   userName: 'admin',
    //   password: 'password',
    //   emailId: 'admin@admin.com',
    //   birthDate: new Date('10/28/1992'),
    // };
    //this.users.push(user);
  }

  /**
   * get user by user name and password
   * @param userName
   * @param password
   */
  getUserByUserNameAndPassword(
    userName: string,
    password: string
  ): User | null {
    let user: User | null = null;
    this.users.forEach((element) => {
      if (element.username === userName && element.password === password) {
        user = element;
      }
    });
    return user;
  }

  /**
   * add new user
   * @param userName
   * @param password
  
   */
  addUser(
    userName: string,
    password: string,
    emailId: string,
    birthDate: Date
  ): boolean {
    let userId = this.users.length + 1;
    let user = new User();
    user.userId = userId;
    user.username = userName;
    user.password = password;
    user.email = emailId;
    user.birthDate = birthDate;
    this.users.push(user);
    return true;
  }
}
