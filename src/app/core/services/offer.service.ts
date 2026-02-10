import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Offer } from '../types/offer';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  constructor(private http : HttpClient) { }

  private mapToOffer(data:any,apiSource: string):Offer{
    return {
        "id": data.id,
        "apiSource": apiSource,
        "title": data.name || data.title,
        "company": data.company.display_name || data.company.name,
        "location": data.location.display_name || data.locations[0].name,
        "url": data.redirect_url || data.refs.landing_page,
        "createdAt": data.created || data.publication_date,
    }
  }

  getOffers(page: number, searchKey: string, country: string, resulsPerPage: number, location: string): Observable<Offer>{

    const adzunaOffers = this.http.get<any>(`${environment.adzunaApiUrl}/${country}/search/${page}`,{
      params : {
        search: searchKey,
        app_id: environment.adzunaAppId,
        app_key: environment.adzunaApiKey,
        results_per_page: resulsPerPage,
        location0: location
      }
    });
    const usajobs = this.http.get<any>(`${environment.usaJobsApiUrl}/Search`,
      {
        params: {
          Page: page,
          ResultsPerPage : resulsPerPage,
          LocationName : location
        }
      }
    );
    
  }
}
