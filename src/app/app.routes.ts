import { Routes } from '@angular/router';
import { PersonDetail } from './person-detail/person-detail';
import { PersonCardList } from './person-card-list/person-card-list';
import { PersonFavoris } from './person-favoris/person-favoris';

export const routes: Routes = [
    { path: '', component: PersonCardList },
    { path: 'favoris', component: PersonFavoris },
    { path: 'personne/:id', component: PersonDetail }
];
