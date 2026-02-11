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

    createApplication(application: Application):Observable<Application>{
      return this.http.post<Application>(`${environment.jsonServerUrl}/applications`,application);
    }

   getMyApplications():Observable<Application[]>{
      return this.http.get<Application[]>(`${environment.jsonServerUrl}/applications`)
    }
  
    updateApplication(applicationId:number, status : string):Observable<Application>{
      return this.http.put<Application>(`${environment.jsonServerUrl}/applications/${applicationId}`,status)
    }
  
    deleteApplication(applicationId:number):Observable<Application>{
      return this.http.delete<Application>(`${environment.jsonServerUrl}/applications/${applicationId}`)
    }
  
}
