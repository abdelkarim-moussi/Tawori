import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from '../../shared/layout/nav-bar/nav-bar.component';
import { Application } from '../../core/types/application';

@Component({
  selector: 'app-applications',
  imports: [NavBarComponent],
  templateUrl: './applications.component.html',
  styleUrl: './applications.component.css'
})
export class ApplicationsComponent implements OnInit {
  applications: Application[] = [];

  constructor(){}

  ngOnInit(): void {

  }

}
