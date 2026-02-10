import { Component, Input } from '@angular/core';
import { Offer } from '../../../core/types/offer';

@Component({
  selector: 'app-offer-card',
  imports: [],
  templateUrl: './offer-card.component.html',
  styleUrl: './offer-card.component.css'
})
export class OfferCardComponent {
  @Input() offer!: Offer;
}
