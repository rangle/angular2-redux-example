import { Injectable, provide } from '@angular/core';
import { ServerService } from '../server/';


@Injectable()
export class AuthService {

  constructor(
    private serverService: ServerService
    ) {}

  public login(username: string, password: string) {
    return new Promise((resolve, reject) => {
      return this.serverService.post('/auth/login',
        {username: username, password: password})
        .map((response: any) => response.meta)
        .subscribe(
          (user) => resolve(user),
          err => reject({username, password})
        );
    });
  }
}

export var AUTH_PROVIDERS: Array<any> = [
  provide(AuthService, {useClass: AuthService})
];

