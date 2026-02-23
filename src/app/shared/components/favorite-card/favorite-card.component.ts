import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Favorite } from '../../../core/types/favorite';
import { Store } from '@ngrx/store';
import * as FavoritesActions from '../../../store/favorites/favorite.actions';

@Component({
    selector: 'app-favorite-card',
    imports: [CommonModule],
    templateUrl: './favorite-card.component.html',
    styleUrl: './favorite-card.component.css'
})
export class FavoriteCardComponent {
    @Input() favorite!: Favorite;

    constructor(private store: Store) { }

    removeFromFavorites(): void {
        if (this.favorite.id) {
            this.store.dispatch(FavoritesActions.removeFromFavorites({
                favoriteId: this.favorite.id,
                offerId: this.favorite.offerId
            }));
        }
    }
}
