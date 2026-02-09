import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Application } from 'express';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ApplicationApiService {

  constructor(private http : HttpClient) { }

    

   getMyApplications():Observable<Application[]>{
      return this.http.get<Application[]>(`${environment.jsonServerUrl}/applications`)
    }
  
    updateApplication(applicationId:number):Observable<Application>{
      return this.http.get<Application>(`${environment.jsonServerUrl}/applications/${applicationId}`)
    }
  
    deleteApplication(applicationId:number):Observable<Application>{
      return this.http.delete<Application>(`${environment.jsonServerUrl}/applications/${applicationId}`)
    }
  
}
