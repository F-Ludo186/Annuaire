import { Routes } from '@angular/router';
import { PersonDetail } from './person-detail/person-detail';
import { PersonCardList } from './person-card-list/person-card-list';

export const routes: Routes = [
    { path: '', component: PersonCardList },
    { path: 'personne/:id', component: PersonDetail }
];
