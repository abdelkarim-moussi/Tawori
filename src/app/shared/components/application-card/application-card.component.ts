import { Component, Input } from '@angular/core';
import { Application } from '../../../core/types/application';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-application-card',
  imports: [CommonModule,RouterLink],
  templateUrl: './application-card.component.html',
  styleUrl: './application-card.component.css'
})
export class ApplicationCardComponent {
  @Input() application!: Application;

}
