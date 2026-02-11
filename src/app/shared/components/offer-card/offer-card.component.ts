import { Component, Input } from '@angular/core';
import { Offer } from '../../../core/types/offer';
import { DatePipe } from '@angular/common';
import { ApplicationApiService } from '../../../core/services/application-api.service';
import { Application } from '../../../core/types/application';

@Component({
  selector: 'app-offer-card',
  imports: [DatePipe],
  templateUrl: './offer-card.component.html',
  styleUrl: './offer-card.component.css'
})
export class OfferCardComponent {
  @Input() offer!: Offer;

  constructor(private applicationService: ApplicationApiService){}


  trackApplication(){

    let application: Application = {
      id:1,
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

    this.applicationService.createApplication(application).subscribe({
      next:(data:Application)=>{
        application = data;
      },
      error:(error)=>{
        console.error("There is an Error Will Trying To Save The Application : ",error);
      }
    }
    );
    
  }
}
