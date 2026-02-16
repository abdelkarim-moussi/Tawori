import { Favorite } from "../../core/types/favorite";
import {createReducer, on} from "@ngrx/store";
import * as FavoritesActions from './favorite.actions'

export interface favoriteState{
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
    }))
);