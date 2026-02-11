import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApplicationApiService } from '../../core/services/application-api.service';
import { Application } from '../../core/types/application';
import { CommonModule } from '@angular/common';

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

  constructor(private activatedRoute: ActivatedRoute, private applicationService: ApplicationApiService){}

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

    this.onStatusChange(this.newStatus)
  }

  onStatusChange(status:string){

  }
}
