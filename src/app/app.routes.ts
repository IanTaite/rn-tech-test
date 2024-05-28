import { Routes } from '@angular/router';
import { mustBeAuthenticatedGuard } from '@guards';

export const routes: Routes = [
  {
    path: 'officer-list',
    loadComponent: () => import('./pages/officer-list-page/officer-list-page.component').then(c => c.OfficerListPageComponent)
  },
  {
    path: 'company-details',
    loadComponent: () => import('./pages/company-details-page/company-details-page.component').then(c => c.CompanyDetailsPageComponent),
    canActivate: [mustBeAuthenticatedGuard]
  },
  {
    path: 'search-results',
    loadComponent: () => import('./pages/search-results-page/search-results-page.component').then(c => c.SearchResultsPageComponent)
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about-page/about-page.component').then(c => c.AboutPageComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login-page/login-page.component').then(c => c.LoginPageComponent)
  },
  {
    path: '',
    loadComponent: () => import('./pages/search-page/search-page.component').then(c => c.SearchPageComponent)
  }
];
