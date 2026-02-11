import { Routes } from '@angular/router';
import { OffersComponent } from './features/offers/offers.component';
export const routes: Routes = [
    {
        path : "offers",
        component: OffersComponent
    },
    {
        path: "applicationDetails/:id",
        loadComponent: () => import('./features/application-details/application-details.component').then(m =>m.ApplicationDetailsComponent)
    }
];
