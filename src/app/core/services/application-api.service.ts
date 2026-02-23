import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Application } from '../types/application';

@Injectable({
  providedIn: 'root',
})
export class ApplicationApiService {
  constructor(private http: HttpClient) {}

  createApplication(application: Application): Observable<Application> {
    return this.http.post<Application>(
      `${environment.jsonServerUrl}/applications`,
      application,
    );
  }

  getMyApplications(): Observable<Application[]> {
    const user = JSON.parse(localStorage.getItem('user')!);
    return this.http.get<Application[]>(
      `${environment.jsonServerUrl}/applications`,
      {
        params: {
          userId: user.id,
        },
      },
    );
  }

  getApplicationById(applicationId: string | null): Observable<Application> {
    return this.http.get<Application>(
      `${environment.jsonServerUrl}/applications/${applicationId}`,
    );
  }

  updateApplicationStatus(
    applicationId: number,
    status: string,
  ): Observable<Application> {
    return this.http.patch<Application>(
      `${environment.jsonServerUrl}/applications/${applicationId}`,
      { status },
    );
  }

  deleteApplication(applicationId: number): Observable<Application> {
    return this.http.delete<Application>(
      `${environment.jsonServerUrl}/applications/${applicationId}`,
    );
  }

  checkIfAlreadyApplied(userId: number, offerId: number): Observable<boolean> {
    return this.http
      .get<Application[]>(`${environment.jsonServerUrl}/applications`, {
        params: {
          userId: userId,
          offerId: offerId,
        },
      })
      .pipe(map((applications) => applications.length > 0));
  }
}
