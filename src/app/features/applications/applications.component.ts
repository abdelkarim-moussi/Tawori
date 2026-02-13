import { Component, OnInit } from '@angular/core';
import { Application } from '../../core/types/application';
import { ApplicationApiService } from '../../core/services/application-api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApplicationCardComponent } from '../../shared/components/application-card/application-card.component';
import { SearchFiltersHeaderComponent } from '../../shared/components/search-filters-header/search-filters-header.component';
import { filter } from 'rxjs';

@Component({
  selector: 'app-applications',
  imports: [FormsModule,CommonModule,ApplicationCardComponent,SearchFiltersHeaderComponent],
  templateUrl: './applications.component.html',
  styleUrl: './applications.component.css'
})
export class ApplicationsComponent implements OnInit {
  applications: Application[] = [];
  filtredApplications: Application[] = [];
  currentPage: number = 1;
  isLoading: boolean = false;
  searchKey: string = "";
  location: string = "";
  errorMessage: string = "";
  createdAt: string = "";

  constructor(private applicationService: ApplicationApiService){}

  ngOnInit(): void {
    this.isLoading = true;
    this.fetchApplications();
  }

  fetchApplications(){
    this.applicationService.getMyApplications().subscribe(
            {
              next: (data)=>{
                this.applications = data;
                this.filtredApplications = data;
                this.isLoading = false;
              },
              error: (error)=>{
                this.applications = [];
                console.error("An Error Was Occured : ",error)
              }
            }
      )   
  }

  onSearch(filters:{searchKey:string, location: string}){
      this.isLoading = true;
      this.filtredApplications = [];
      const key = filters.searchKey.toLowerCase()
      const location = filters.location.toLowerCase()

      if(this.applications.length > 0){
        if(key != "" || location != ""){
          this.filtredApplications = this.applications.filter(app => 
            app.title.toLowerCase().includes(key) && app.location.toLowerCase().includes(location)
          );
        }else{
          this.filtredApplications = this.applications;
        }
      }
      
      this.isLoading = false
  }

  goToNextPage(){
    
  }

  goToPreviousPage(){

  }

}
