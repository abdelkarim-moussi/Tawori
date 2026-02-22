import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Offer } from '../../../core/types/offer';
import { CommonModule, DatePipe } from '@angular/common';
import { ApplicationApiService } from '../../../core/services/application-api.service';
import { Application } from '../../../core/types/application';
import { Router } from '@angular/router';
import { FavoriteApiService } from '../../../core/services/favorite-api.service';
import { Favorite } from '../../../core/types/favorite';
import { Store } from '@ngrx/store';
import * as FavoritesActions from "../../../store/favorites/favorite.actions";
import { selectFavoriteByOfferId } from '../../../store/favorites/favorite.selector';

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
    private favoriteService: FavoriteApiService,
    private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(FavoritesActions.loadFavorites())

    this.store.select(selectFavoriteByOfferId(this.offer.id)).subscribe(
      favorite => {
        this.existInFavorite = !!favorite,
        this.favorite = favorite
      }
    )
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
    if (this.existInFavorite) {
      this.store.dispatch(FavoritesActions.removeFromFavorites({offerId : this.offer.id}))
    } else {

      const newFavorite: Favorite = {
        company: this.offer.company,
        offerId: this.offer.id,
        userId: 1,
        location: this.offer.location,
        title: this.offer.title
      };

      this.store.dispatch(FavoritesActions.addToFavorites({favorite: newFavorite}))
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