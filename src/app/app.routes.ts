import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { guessGuard } from './core/guards/guess.guard';
export const routes: Routes = [

    {
        path: "offers",
        loadComponent: () => import('./features/offers/offers.component').then(m => m.OffersComponent)
    },
    {
        path: "applicationDetails/:id",
        loadComponent: () => import('./features/application-details/application-details.component').then(m => m.ApplicationDetailsComponent),
        canActivate: [authGuard]
    },
    {
        path: "applications",
        loadComponent: () => import('./features/applications/applications.component').then(m => m.ApplicationsComponent),
        canActivate: [authGuard]
    },
    {
        path: "favorites",
        loadComponent: () => import('./features/favorites/favorites.component').then(m => m.FavoritesComponent),
        canActivate: [authGuard]
    },
    {
        path: 'register',
        loadComponent: () => import('./features/authentication/register/register.component').then(m => m.RegisterComponent),
        canActivate: [guessGuard]
    },
    {
        path: 'login',
        loadComponent: () => import('./features/authentication/login/login.component').then(m => m.LoginComponent),
        canActivate: [guessGuard]
    },
    {
        path: 'profile',
        loadComponent: () => import('./features/authentication/profile/profile.component').then(m => m.ProfileComponent),
        canActivate: [authGuard]
    }
];
