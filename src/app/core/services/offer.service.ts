import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, forkJoin, map, Observable } from 'rxjs';
import { Offer } from '../types/offer';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  constructor(private http : HttpClient) { }

  private mapToOffer(data:any,apiSource: string):Offer{
    return {
        "id": data.id || data.MatchedObjectId,
        "apiSource": apiSource,
        "title": data.name || data.title || data.PositionTitle,
        "company": data.company?.display_name || data.company?.name || data.OrganizationName,
        "location": data.location?.display_name || data?.locations?.[0].name || data.PositionLocationDisplay,
        "url": data.redirect_url || data.refs?.landing_page || data.PositionURI,
        "createdAt": data.created || data.publication_date || data.PublicationStartDate,
    }
  }

  getOffers(page: number, searchKey: string, country: string, resulsPerPage: number, location: string): Observable<Offer[]>{

    const halfLimit = Math.floor(resulsPerPage/2);

    const adzunaOffers = this.http.get<any>(`${environment.adzunaApiUrl}/${country}/search/${page}`,{
      headers: {
        accept: "application/json"
      },
      params : {
        app_id: environment.adzunaAppId,
        app_key: environment.adzunaApiKey,
        what: searchKey,
        results_per_page: halfLimit,
        where: location || ""
      }
    }).pipe(
      catchError(error => {
        console.log("Adzuna API Failed: ",error);
        return [{result: []}]
      })
    );

    const usaOffersHeaders = new HttpHeaders({
      'accept': 'application/json',
      'Authorization-Key': environment.usaJobsApiKey
    })

    const usaOffers = this.http.get<any>(`${environment.usaJobsApiUrl}/Search`,
      {
        headers: usaOffersHeaders,
        params: {
          Page: page,
          ResultsPerPage : halfLimit,
          LocationName : location
        }
      }
    ).pipe(
      catchError(error => {
        console.error("UsaJobs API Failed: ",error);
        return [{result : []}]
      })
    );

    return forkJoin([adzunaOffers,usaOffers]).pipe(
      map(([adzunaRes,usaRes])=>{
        const adzunaList = (adzunaRes.results || []).map((item:any) => this.mapToOffer(item,"Adzuna"));
        const usaList = (usaRes.SearchResult?.SearchResultItems || []).map((item:any) => this.mapToOffer(item.MatchedObjectDescriptor,"UsaJobs"));

        return [...adzunaList,...usaList]
      }))    
  }
}
