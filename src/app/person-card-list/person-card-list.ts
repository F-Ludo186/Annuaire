import { Component, computed, inject,signal } from '@angular/core';
import { PersonService } from '../services/person.service';
import { PersonCard } from '../person-card/person-card';
import { AsyncState } from '../async-state/async-state';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@Component({
  imports: [ PersonCard, AsyncState, MatInputModule, MatFormFieldModule],
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
  
  filter = signal('');

  affichagePersonne = computed(() => {
    const value = this.filter().trim().toLowerCase();

    //if (!value || value?.trim().length < 3) {
    if (!value) {
        return this.persons();
    }

    return this.persons().filter(p =>
        (p.first + " " + p.last).toLowerCase().includes(value)
    );
});
}
