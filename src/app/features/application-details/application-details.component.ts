import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApplicationApiService } from '../../core/services/application-api.service';
import { Application } from '../../core/types/application';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-application-details',
  imports: [CommonModule],
  templateUrl: './application-details.component.html',
  styleUrl: './application-details.component.css'
})
export class ApplicationDetailsComponent implements OnInit {
  applicationId: string | null = null;
  application: Application | null = null;
  @Input() newStatus: string = "";

  statuses: Array<any> = Array.of("pending","applied","interview","rejected","accepted","offered")

  constructor(private activatedRoute: ActivatedRoute, 
    private applicationService: ApplicationApiService,
  private toastService: ToastrService){}

  ngOnInit(): void {

    this.applicationId = this.activatedRoute.snapshot.paramMap.get("id");
    if(this.applicationId){
      this.applicationService.getApplicationById(this.applicationId).subscribe(
        {
          next:(data: Application)=>{
            this.application = data;
          },error:(error)=>{
            console.error("There Was An Error While Geting Application : ",error)
          }
        }
      )    
    }

  }

  onStatusChange(applicationId: number,status:string){
    this.applicationService.updateApplicationStatus(applicationId,status).subscribe(
      {
        next:(data)=>{
          this.toastService.success("Status Updated Succefully To ",status);
          this.application = data;
          this.application.status = status;
        },
        error:(error)=>{
          this.toastService.error("Failed To Update Status");
        }
      }
    )
  }
}
