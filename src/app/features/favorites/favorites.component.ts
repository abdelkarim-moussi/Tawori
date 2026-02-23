import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Favorite } from '../../core/types/favorite';
import * as FavoritesActions from '../../store/favorites/favorite.actions';
import { selectFavoritesState } from '../../store/favorites/favorite.selector';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { SearchFiltersHeaderComponent } from '../../shared/components/search-filters-header/search-filters-header.component';
import { FavoriteCardComponent } from '../../shared/components/favorite-card/favorite-card.component';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-favorites',
  imports: [CommonModule, SearchFiltersHeaderComponent, FavoriteCardComponent, NgxPaginationModule],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent implements OnInit, OnDestroy {
  
    constructor(private store : Store) { }
  
    favorites: Favorite[] = [];
    filtredFavorites: Favorite[] = [];
    page: number = 1;
    resultsPerPage: number = 20;
    totalItems: number = this.favorites.length;
    isLoading: boolean = false;
    errorMessage: string = '';
    searchKey: string = "";
    country: string = "us";
    location: string = "";

    private sub!: Subscription;
  
    fetchFavorites() {
      this.isLoading = true;
      this.errorMessage = '';

      this.store.dispatch(FavoritesActions.loadFavorites())

      this.sub = this.store.select(selectFavoritesState).subscribe(
        state => {
          this.favorites = state.favorites;
          this.filtredFavorites = state.favorites;
          this.isLoading = state.loading;
          this.errorMessage = state.error ?? '';
        } 
      )

    }

    ngOnInit(): void {
      this.fetchFavorites();
    }
  
    goToNextPage() {
      if(this.page < this.totalPages){
        this.page++;
        this.fetchFavorites();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  
    goToPreviousPage() {
      if (this.page > 1) {
        this.page--;
        this.fetchFavorites();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  
    onSearch(filters: { searchKey: string, location: string, country: string }) {
      this.searchKey = filters.searchKey;
      this.location = filters.location;
      this.country = filters.country;
      this.page = 1;
      this.fetchFavorites();
    }

  
    ngOnDestroy(): void {
      this.sub.unsubscribe;
    }

    get totalPages(): number {
    return Math.ceil(this.filtredFavorites.length / this.resultsPerPage);
  }
}
