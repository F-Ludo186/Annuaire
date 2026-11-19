import { Component, computed, inject } from '@angular/core';
import { PersonService } from '../services/person.service';
import { PersonCard } from '../person-card/person-card';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  imports: [PersonCard, MatInputModule, MatFormFieldModule],
  selector: 'app-person-favoris',
  styleUrl: './person-favoris.css',
  templateUrl: './person-favoris.html',
})
export class PersonFavoris {
  private readonly personService = inject(PersonService);
  
  personsfavoris = computed( () => {
    return this.personService.cards().filter((p) => p.favori);
  }); 
}
