import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Application } from '../../../core/types/application';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApplicationApiService } from '../../../core/services/application-api.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-application-card',
  imports: [CommonModule,RouterLink],
  templateUrl: './application-card.component.html',
  styleUrl: './application-card.component.css'
})
export class ApplicationCardComponent {
  @Input() application!: Application;

  @Output() applicationDeleted = new EventEmitter<number>();

  constructor(private applicationService: ApplicationApiService,
    private toastrService : ToastrService
  ){}


  deleteApplication(applicationId: number){
    console.log("delete")
    this.applicationService.deleteApplication(applicationId).subscribe({
      next:(data)=>{
        this.applicationDeleted.emit(applicationId);
        this.toastrService.success("Application Withdrawn Succefully","success")
      },
      error:(error)=>{
        this.toastrService.error("Error Withdrawing This Application","error")
      }
    });
  }
}
