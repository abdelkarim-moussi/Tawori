import { Component, Input } from '@angular/core';
import { Offer } from '../../../core/types/offer';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-offer-card',
  imports: [DatePipe],
  templateUrl: './offer-card.component.html',
  styleUrl: './offer-card.component.css'
})
export class OfferCardComponent {
  @Input() offer!: Offer;
}
