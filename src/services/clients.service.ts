import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { NumberValueAccessor } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  public idUpDate : string = "";
  constructor(private http: HttpClient) { }

  public getUsers(): Observable<any> {
    return this.http.get("http://localhost:3000/api/v1/users/");
  }

  public CreateUsers(data: any) {
    const URL = 'http://localhost:3000/api/v1/users/'

    return this.http.post(URL, data);
  }

  public DeleteUsers(id: any) {
    const URL = `${"http://localhost:3000/api/v1/users"}/${id}`
    return this.http.delete(URL);
  }

  public searchUser(id: any) {
    const URL = `${"http://localhost:3000/api/v1/users"}/${id}`
    return this.http.get(URL);
  }

  public upDateUser(id: any, data:any) {
    const URL = `${"http://localhost:3000/api/v1/users"}/${id}`
    return this.http.patch(URL,data);
  }
}
