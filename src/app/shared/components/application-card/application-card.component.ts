import { Component, Input } from '@angular/core';
import { Application } from '../../../core/types/application';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApplicationApiService } from '../../../core/services/application-api.service';
@Component({
  selector: 'app-application-card',
  imports: [CommonModule,RouterLink],
  templateUrl: './application-card.component.html',
  styleUrl: './application-card.component.css'
})
export class ApplicationCardComponent {
  @Input() application!: Application;

  messageType: 'success' | 'error' | null = null;
  message: string = '';

  constructor(private applicationService: ApplicationApiService){}


  deleteApplication(applicationId: number){
    this.applicationService.deleteApplication(applicationId).subscribe({
      next:(data)=>{
        this.messageType = "success";
        this.message = "application withdrawed succefully"
      },
      error:(error)=>{
        this.messageType = "error";
        this.message = "Error Withdrawing This Application"
      }
    });
  }
}
