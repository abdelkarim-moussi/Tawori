import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Offer } from '../../../core/types/offer';
import { CommonModule, DatePipe } from '@angular/common';
import { ApplicationApiService } from '../../../core/services/application-api.service';
import { Application } from '../../../core/types/application';
import { Router } from '@angular/router';
import { FavoriteApiService } from '../../../core/services/favorite-api.service';
import { Favorite } from '../../../core/types/favorite';

@Component({
  selector: 'app-offer-card',
  imports: [DatePipe, CommonModule],
  templateUrl: './offer-card.component.html',
  styleUrl: './offer-card.component.css'
})
export class OfferCardComponent implements OnInit {
  @Input() offer!: Offer;
  message: string | null = null;
  messageType: 'success' | 'error' | 'info' | null = null;
  alreadyApplied: boolean = false;

  application!: Application;
  favorite!: Favorite;

  existInFavorite: boolean = false;

  constructor(private applicationService: ApplicationApiService,
    private router: Router,
    private favoriteService: FavoriteApiService) { }

  ngOnInit(): void {
    this.verifyIfOfferIsInFavorite();
  }

  trackApplication() {
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

    this.applicationService.checkIfAlreadyApplied(this.application.userId, this.application.offerId).subscribe({
      next: (applied) => {
        this.alreadyApplied = applied;
        if (!this.alreadyApplied) {
          this.processApplication(this.application);
        }
      }
    });
  }

  processApplication(application: Application) {
    this.applicationService.createApplication(application).subscribe({
      next: (data: Application) => {
        application = data;
        this.messageType = "success";
        this.message = "Application Succefull";
        this.router.navigate(["applicationDetails", application.id])
      },
      error: (error) => {
        console.error("There is an Error Will Trying To Save The Application : ", error);
        this.messageType = "error";
        this.message = "Application Failed"
      }
    });
  }

  addToFavorites() {
    if (!this.existInFavorite) {

      const newFavorite: Favorite = {
        company: this.offer.company,
        offerId: this.offer.id,
        userId: 1,
        location: this.offer.location,
        title: this.offer.title
      };

      this.favoriteService.addTofavorite(newFavorite).subscribe({
        next: (data) => {
          this.favorite = data;
          this.existInFavorite = true;
        },
        error: (error) => {
          console.error("Failed To Add Offer To Favorite ", error);
        }
      });
    } else {

      if (this.favorite?.id) {
        this.favoriteService.removeFromFavorite(this.favorite.id).subscribe({
          next: () => {
            this.existInFavorite = false;
          },
          error: (error) => {
            console.error("Failed To Remove Offer From Favorites ", error);
          }
        });
      }
    }
  }

  verifyIfOfferIsInFavorite() {
    this.favoriteService.getfavoriteByOfferId(this.offer.id).subscribe({
      next: (data: any) => {
        const favorites = Array.isArray(data) ? data : [data];
        if (favorites.length > 0 && favorites[0].id) {
          this.existInFavorite = true;
          this.favorite = favorites[0];
        } else {
          this.existInFavorite = false;
        }
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}