import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
export interface User {
  "id": number,
  "firstName": string,
  "lastName": string,
  "email": string,
  "password": string
}

export interface UserDTO{ 
  "id": number,
  "firstName": string,
  "lastName": string,
  "email": string,

}


@Injectable({
  providedIn: 'root'
})
export class DataStoreService {

  constructor(private http: HttpClient) {
  }



  getUsers(): Observable<UserDTO[]> {
    return this.http.get<UserDTO[]>(`${environment.jsonServerUrl}/users`);
  }
  getUserById(userId:number): Observable<UserDTO[]> {
    return this.http.get<UserDTO[]>(`${environment.jsonServerUrl}/users/${userId}`);
  }
  addUser(user: User): Observable<UserDTO> {
    return this.http.post<UserDTO>(`${environment.jsonServerUrl}/users`, user);
  }

  updateUser(userId:number,user: User): Observable<UserDTO> {
    return this.http.patch<UserDTO>(`${environment.jsonServerUrl}/users/${userId}`, user);
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete<any>(`${environment.jsonServerUrl}/users/${userId}`);
  }

}
