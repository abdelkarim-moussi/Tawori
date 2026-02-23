import { createFeatureSelector, createSelector } from '@ngrx/store';
import { favoriteState } from './favorite.reducer';

export const selectFavoritesState =
  createFeatureSelector<favoriteState>('favorites');

export const selectAllFavorites = createSelector(
  selectFavoritesState,
  (state) => state.favorites,
);

export const selectFavoriteByOfferId = (offerId: number) =>
  createSelector(
    selectAllFavorites,
    (favorites) => favorites.find((f) => f.offerId === offerId) ?? null,
  );
