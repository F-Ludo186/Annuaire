import { Component, inject } from '@angular/core';
import { PersonService } from '../services/person.service';
import { PersonCard } from '../person-card/person-card';
import {MatGridListModule} from '@angular/material/grid-list';
import { AsyncState } from '../async-state/async-state';

@Component({
  imports: [ PersonCard, MatGridListModule, AsyncState],
  selector: 'app-person-card-list',
  styleUrl: './person-card-list.css',
  templateUrl: './person-card-list.html',
})
export class PersonCardList {
  private readonly personService = inject(PersonService);
  
  persons = this.personService.cards
  loading = this.personService.loading;                  
  error = this.personService.error;     
  loadedFromBackup = this.personService.loadedFromBackup;


}
