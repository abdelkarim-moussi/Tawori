import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Favorite } from '../types/favorite';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class FavoriteApiService {

  constructor(private http : HttpClient) { }

   getFavorites():Observable<Favorite[]>{
    return this.http.get<Favorite[]>(`${environment.jsonServerUrl}/favorites`);
  }

  getFavoriteById(favoriteId:number):Observable<Favorite>{
    return this.http.get<Favorite>(`${environment.jsonServerUrl}/favorites/${favoriteId}`);
  }

  addTofavorite(newFavorite:Favorite):Observable<Favorite>{
    return this.http.post<Favorite>(`${environment.jsonServerUrl}/favorites`,newFavorite);
  }

  removeFromFavorite(favoriteId: number):Observable<any>{
    return this.http.delete<any>(`${environment.jsonServerUrl}/favorites/${favoriteId}`);
  }
}
