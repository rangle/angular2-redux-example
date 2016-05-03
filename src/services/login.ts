import { Injectable } from '@angular/core';
import usersMock from './mock/users';

@Injectable()
export class LoginService {
  login(username, password) {
    return new Promise((resolve, reject) => {
      const foundUsers = usersMock.filter((user) => user.Username === username);

      const isValid = (
        foundUsers.length === 1 &&
        foundUsers[0].Password === password
      );

      if (isValid) {
        setTimeout(() => resolve({
          token: '1234-5678-9101-1213',
          profile: {
            firstName: 'Jane',
            lastName: 'Smith',
          },
        }), 750);
      } else {
        setTimeout(() => reject({username, password}), 750);
      }
    });
  }
}
