import { Favorite } from "../../core/types/favorite";
import { createReducer, on } from "@ngrx/store";
import * as FavoritesActions from './favorite.actions'

export interface favoriteState {
    favorites: Favorite[];
    loading: boolean,
    error: string | null
}

export const initialState: favoriteState = {
    favorites: [],
    loading: false,
    error: null
}

export const favoriteReducer = createReducer(
    initialState,
    on(FavoritesActions.loadFavorites, (state) => ({
        ...state,
        loading: true,
        error: null
    })),
    on(FavoritesActions.loadFavoritesSuccess, (state, { favorites }) => ({
        ...state,
        loading: false,
        favorites,
        error: null
    })),
    on(FavoritesActions.loadFavoritesFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),
    on(FavoritesActions.addToFavorites, (state) => ({
        ...state,
        loading: true,
        error: null
    })),
    on(FavoritesActions.addToFavoritesSuccess, (state, { favorite }) => ({
        ...state,
        loading: false,
        favorites: [...state.favorites, favorite],
        error: null
    })),
    on(FavoritesActions.addToFavoritesFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),
    on(FavoritesActions.removeFromFavorites, (state) => ({
        ...state,
        loading: true,
        error: null
    })),
    on(FavoritesActions.removeFromFavoritesSuccess, (state, { offerId }) => ({
        ...state,
        loading: false,
        favorites: state.favorites.filter(f => f.offerId !== offerId),
        error: null
    })),
    on(FavoritesActions.removeFromFavoritesFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    }))
);