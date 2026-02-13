import { Routes } from '@angular/router';
export const routes: Routes = [

    {
        path : "offers",
        loadComponent: () => import('./features/offers/offers.component').then(m => m.OffersComponent)
    },
    {
        path: "applicationDetails/:id",
        loadComponent: () => import('./features/application-details/application-details.component').then(m =>m.ApplicationDetailsComponent)
    },
    {
        path: "applications",
        loadComponent: () => import('./features/applications/applications.component').then(m => m.ApplicationsComponent)
    }
];
