import { Component, OnDestroy, OnInit } from '@angular/core';
import { Offer } from '../../core/types/offer';
import { OfferService } from '../../core/services/offer.service';
import { NgIf, NgFor, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableComponent } from '../../shared/components/table/table/table.component';
import { ColumnDef } from '../../core/types/column-def';
import { OfferCardComponent } from '../../shared/components/offer-card/offer-card.component';

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
  imports: [NgIf, NgFor, TableComponent, OfferCardComponent, CommonModule, FormsModule],
  templateUrl: './offers.component.html',
  styleUrl: './offers.component.css'
})
export class OffersComponent implements OnInit, OnDestroy {

  constructor(private offerService: OfferService) { }

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
  }

  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchOffers();
    }
  }

  onSearch() {
    this.currentPage = 1;
    this.fetchOffers();
  }

  ngOnInit(): void {
    this.fetchOffers();
  }

  ngOnDestroy(): void {
    this.offers = [];
  }

}
