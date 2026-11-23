import { Routes } from '@angular/router';
import { hasFavoritesGuardGuard } from './has-favorites-guard-guard';

export const routes: Routes = [
    // loadComponent chargement differé des pages
    { path: '', loadComponent: () => import('./person-card-list/person-card-list').then(m => m.PersonCardList) },
    { path: 'ajouter', loadComponent: () => import('./personn-form/person-form').then(m => m.PersonForm) },
    { path: 'favoris', loadComponent: () => import('./person-favoris/person-favoris').then(m => m.PersonFavoris), canActivate: [hasFavoritesGuardGuard] },
    { path: 'personne/:id', loadComponent: () => import('./person-detail/person-detail').then(m => m.PersonDetail) }
];
