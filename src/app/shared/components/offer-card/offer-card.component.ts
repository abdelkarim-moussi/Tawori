import { Component, Input } from '@angular/core';
import { Offer } from '../../../core/types/offer';
import { CommonModule, DatePipe } from '@angular/common';
import { ApplicationApiService } from '../../../core/services/application-api.service';
import { Application } from '../../../core/types/application';
import { Router } from '@angular/router';
import { FavoriteApiService } from '../../../core/services/favorite-api.service';

@Component({
  selector: 'app-offer-card',
  imports: [DatePipe, CommonModule],
  templateUrl: './offer-card.component.html',
  styleUrl: './offer-card.component.css'
})
export class OfferCardComponent {
  @Input() offer!: Offer;
  message: string | null = null;
  messageType: 'success' | 'error' | 'info' | null = null;
  alreadyApplied: boolean = false;

  application!: Application;

  constructor(private applicationService: ApplicationApiService,
    private router: Router,
  private favoriteService: FavoriteApiService){}

  trackApplication(){

    this.application = {
      userId: 1, 
      offerId: Number(this.offer.id),
      apiSource: this.offer.apiSource,
      title: this.offer.title,
      company: this.offer.company,
      location: this.offer.location,
      url: this.offer.url,
      status: 'Pending',
      notes: '',
      dateAdded: new Date().toISOString()
    };

    this.applicationService.checkIfAlreadyApplied(this.application.userId,this.application.offerId).subscribe(
      {
        next:(applied)=>{
          this.alreadyApplied = applied;
        }
      }
    )

    if(!this.alreadyApplied){
      this.processApplication(this.application);
    }
    
  }

  processApplication(application: Application){
    this.applicationService.createApplication(application).subscribe({
      next:(data:Application)=>{
        application = data;
        this.messageType = "success";
        this.message = "Application Succefull";
        this.router.navigate(["applicationDetails",application.id])
      },
      error:(error)=>{
        console.error("There is an Error Will Trying To Save The Application : ",error);
        this.messageType = "error";
        this.message = "Application Failed"
      }
    }
    );
  }


  addToFavorites(applicationId: number){

  }

  verifyIfApplicationIsInFavorite(applicationId: number){
    this.favoriteService.getFavoriteById()
  }
}
