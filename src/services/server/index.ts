import { Injectable, provide } from '@angular/core';
import {Http, Request, Response, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

const HEADERS = new Headers({ 'Content-Type': 'application/json' });


@Injectable()
export class ServerService {

  private BASE_URL = 'http://localhost:8080/api';

  constructor(
    private _http: Http
  ) {}

  public post(path, data) {
    return this._http.post(this.BASE_URL + path, JSON.stringify(data),
      { headers: HEADERS})
     .map((res: Response) => res.json());
  }

}

export var SERVER_PROVIDERS: Array<any> = [
  provide(ServerService, {useClass: ServerService})
];

