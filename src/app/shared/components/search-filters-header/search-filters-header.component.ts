import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-filters-header',
  imports: [FormsModule, CommonModule],
  templateUrl: './search-filters-header.component.html',
  styleUrl: './search-filters-header.component.css'
})
export class SearchFiltersHeaderComponent {

  @Input() isLoading = false;
  @Input() showLocationFilter = true;
  @Input() showCountryFilter = true;

  searchKey = '';
  location = '';
  country = 'us';

  @Output() search = new EventEmitter<{
    searchKey: string,
    location: string,
    country: string
  }>()

  onSearch(){
    this.search.emit({
      searchKey: this.searchKey,
      location: this.location,
      country: this.country
    })
  }

  onReset(){
    if(this.searchKey != "" || this.location != "" || this.country != "us"){
      this.searchKey = '';
      this.location = '';
      this.country = 'us';
      
      this.onSearch()
    }
  }
}
