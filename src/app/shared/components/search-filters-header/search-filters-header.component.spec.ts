import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFiltersHeaderComponent } from './search-filters-header.component';

describe('SearchFiltersHeaderComponent', () => {
  let component: SearchFiltersHeaderComponent;
  let fixture: ComponentFixture<SearchFiltersHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchFiltersHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchFiltersHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
