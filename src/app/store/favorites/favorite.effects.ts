import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { FavoriteApiService } from "../../core/services/favorite-api.service";
import * as FavoritesActions from './favorite.actions'
import { catchError, map, mergeMap, of } from "rxjs";
import { Favorite } from "../../core/types/favorite";

@Injectable()
export class FavoriteEffects {
    private actions$ = inject(Actions)
    private favoriteService = inject(FavoriteApiService)

    loadFavorites$ = createEffect(() =>
        this.actions$.pipe(
            ofType(FavoritesActions.loadFavorites),
            mergeMap(() =>
                this.favoriteService.getFavorites().pipe(
                    map((favorites) => FavoritesActions.loadFavoritesSuccess({ favorites })),
                    catchError((error) =>
                        of(FavoritesActions.loadFavoritesFailure({
                            error: error.message || "Failed To Load Favorites, Please Try Again"
                        })))
                )
            )
        )
    )

    addToFavorites$ = createEffect(() =>
        this.actions$.pipe(
            ofType(FavoritesActions.addToFavorites),
            mergeMap(({ offerId }) =>
                this.favoriteService.getfavoriteByOfferId(offerId).pipe(
                    mergeMap((data: any) => {
                        const favorites = Array.isArray(data) ? data : [data];
                        if (favorites.length > 0 && favorites[0].id) {
                            return of(FavoritesActions.addToFavoritesSuccess({ favorite: favorites[0] }));
                        }
                        return of(FavoritesActions.addToFavoritesFailure({ error: 'Favorite not found after add' }));
                    }),
                    catchError((error) =>
                        of(FavoritesActions.addToFavoritesFailure({
                            error: error.message || "Failed To Add To Favorites"
                        })))
                )
            )
        )
    )

    removeFromFavorites$ = createEffect(() =>
        this.actions$.pipe(
            ofType(FavoritesActions.removeFromFavorites),
            mergeMap(({ offerId }) =>
                this.favoriteService.getfavoriteByOfferId(offerId).pipe(
                    mergeMap((data: any) => {
                        const favorites = Array.isArray(data) ? data : [data];
                        if (favorites.length > 0 && favorites[0].id) {
                            return this.favoriteService.removeFromFavorite(favorites[0].id).pipe(
                                map(() => FavoritesActions.removeFromFavoritesSuccess({ offerId })),
                                catchError((error) =>
                                    of(FavoritesActions.removeFromFavoritesFailure({
                                        error: error.message || "Failed To Remove From Favorites"
                                    })))
                            );
                        }
                        return of(FavoritesActions.removeFromFavoritesFailure({ error: 'Favorite not found' }));
                    }),
                    catchError((error) =>
                        of(FavoritesActions.removeFromFavoritesFailure({
                            error: error.message || "Failed To Remove From Favorites"
                        })))
                )
            )
        )
    )
}
