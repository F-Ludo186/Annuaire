import { Routes } from '@angular/router';
import { PersonDetail } from './person-detail/person-detail';
import { PersonCardList } from './person-card-list/person-card-list';
import { PersonFavoris } from './person-favoris/person-favoris';
import { PersonForm } from './personn-form/person-form';

export const routes: Routes = [
    { path: '', component: PersonCardList },
    { path: 'ajouter', component: PersonForm },
    { path: 'favoris', component: PersonFavoris },
    { path: 'personne/:id', component: PersonDetail }
];
