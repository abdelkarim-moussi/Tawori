import { createAction, props } from "@ngrx/store";
import { Favorite } from "../../core/types/favorite";

export const loadFavorites = createAction('[Favorites] Load Favorites');

export const loadFavoritesSuccess = createAction(
    '[Favorites] Load Favorites Success',
    props<{ favorites: Favorite[] }>()
)
export const loadFavoritesFailure = createAction(
    '[Favorites] Load Favorites Failure',
    props<{ error: string }>()
)

export const addToFavorites = createAction(
    '[Favorites] Add To Favorites',
    props<{ offerId: number }>()
)

export const addToFavoritesSuccess = createAction(
    '[Favorites] Add To Favorites Success',
    props<{ favorite: Favorite }>()
)

export const addToFavoritesFailure = createAction(
    '[Favorites] Add To Favorites Failure',
    props<{ error: string }>()
)

export const removeFromFavorites = createAction(
    '[Favorites] Remove From Favorites',
    props<{ offerId: number }>()
)

export const removeFromFavoritesSuccess = createAction(
    '[Favorites] Remove From Favorites Success',
    props<{ offerId: number }>()
)

export const removeFromFavoritesFailure = createAction(
    '[Favorites] Remove From Favorites Failure',
    props<{ error: string }>()
)
