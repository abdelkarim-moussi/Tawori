import { createFeatureSelector, createSelector } from "@ngrx/store";
import { favoriteState } from "./favorite.reducer";

export const selectFavoriteState = createFeatureSelector<favoriteState>('favorites');

export const selectFavorites = createSelector(
    selectFavoriteState,
    (state) => state.favorites
);

export const selectFavoritesLoading = createSelector(
    selectFavoriteState,
    (state) => state.loading
);

export const selectFavoritesError = createSelector(
    selectFavoriteState,
    (state) => state.error
);

export const selectIsFavorite = (offerId: number) => createSelector(
    selectFavorites,
    (favorites) => favorites.some(f => f.offerId === offerId)
);
