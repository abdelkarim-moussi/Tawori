import { Component, OnDestroy, OnInit } from '@angular/core';
import { Offer } from '../../core/types/offer';
import { OfferService } from '../../core/services/offer.service';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-offers',
  imports: [NgIf,NgFor],
  templateUrl: './offers.component.html',
  styleUrl: './offers.component.css'
})
export class OffersComponent implements OnInit, OnDestroy {

  constructor(private offerService: OfferService ){}

  offers: Offer[] = [];
  currentPage : number = 1;
  pageSize: number = 20;
  totalItems: number = 0;
  isLoading: boolean = false;
  errorMessage: string = '';
  searchKey: string = "";
  country: string = "us";
  location: string = "";

  fetchOffers(){
    this.isLoading = true;
    this.errorMessage = '';
    
    this.offerService.getOffers(this.currentPage,this.searchKey,this.country,this.pageSize,this.location).subscribe(
      {
        next:(data: Offer[])=>{
          this.offers = data;
          this.isLoading = false;
        },error: (error)=>{
          this.errorMessage = "Fetching Data Failed";
          this.isLoading = false;
          console.log(error);
        }
      }
    )
  }

  goToNextPage(){
    this.currentPage++;
    this.fetchOffers();
  }

  goToPreviousPage(){
    if(this.currentPage > 1){
      this.currentPage--;
      this.fetchOffers();
    }
  }

  ngOnInit(): void {
    this.fetchOffers();
  }

  ngOnDestroy(): void {
    this.offers = [];
  }

}
