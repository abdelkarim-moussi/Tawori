import { Favorite } from "../../core/types/favorite";
import {createReducer} from "@ngrx/store";

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
    on(FavoriteActions.loadFavorites,(state) => ({
        ...state,
        loading: true,
        error: null
    }))
);