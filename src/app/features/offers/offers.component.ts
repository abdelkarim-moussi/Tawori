import { Component, OnDestroy, OnInit } from '@angular/core';
import { Offer } from '../../core/types/offer';
import { OfferService } from '../../core/services/offer.service';
import { NgIf, NgFor, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ColumnDef } from '../../core/types/column-def';
import { OfferCardComponent } from '../../shared/components/offer-card/offer-card.component';
import { SearchFiltersHeaderComponent } from '../../shared/components/search-filters-header/search-filters-header.component';
import { Store } from '@ngrx/store';
import * as FavoritesActions from '../../store/favorites/favorite.actions';

export const COLUMN_DEFINITIONS: ColumnDef<Offer>[] = [
  { headerText: 'Source', field: 'apiSource' },
  { headerText: 'Title', field: 'title' },
  { headerText: 'Company', field: 'company' },
  { headerText: 'Location', field: 'location' },
  { headerText: 'Url', field: 'url' },
  { headerText: 'Publication Date', field: 'createdAt' }
];
@Component({
  selector: 'app-offers',
  imports: [NgIf, NgFor, OfferCardComponent, CommonModule, FormsModule, SearchFiltersHeaderComponent],
  templateUrl: './offers.component.html',
  styleUrl: './offers.component.css'
})
export class OffersComponent implements OnInit, OnDestroy {

  constructor(private offerService: OfferService, private store: Store) { }

  offers: Offer[] = [];
  currentPage: number = 1;
  pageSize: number = 20;
  totalItems: number = 0;
  isLoading: boolean = false;
  errorMessage: string = '';
  searchKey: string = "";
  country: string = "us";
  location: string = "";
  columns = COLUMN_DEFINITIONS;

  fetchOffers() {
    this.isLoading = true;
    this.errorMessage = '';

    this.offerService.getOffers(this.currentPage, this.searchKey, this.country, this.pageSize, this.location).subscribe(
      {
        next: (data: Offer[]) => {
          this.offers = data;
          this.isLoading = false;
        }, error: (error) => {
          this.errorMessage = "Fetching Data Failed";
          this.isLoading = false;
          console.log(error);
        }
      }
    )
  }

  goToNextPage() {
    this.currentPage++;
    this.fetchOffers();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchOffers();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  onSearch(filters: { searchKey: string, location: string, country: string }) {
    this.searchKey = filters.searchKey;
    this.location = filters.location;
    this.country = filters.country;
    this.currentPage = 1;
    this.fetchOffers();
  }

  ngOnInit(): void {
    this.store.dispatch(FavoritesActions.loadFavorites());
    this.fetchOffers();
  }

  ngOnDestroy(): void {
    this.offers = [];
  }

}

