import { Component, inject, input } from '@angular/core';
import { PersonService } from '../services/person.service';
import { PersonsCard } from '../models/person.model';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  imports: [MatCardModule, RouterLink, MatIconModule],
  selector: 'app-person-card',
  styleUrl: './person-card.css',
  templateUrl: './person-card.html',
})
export class PersonCard {
  private readonly personService = inject(PersonService);
  person = input.required<PersonsCard>();

  changefav(event: MouseEvent): void {
    event.stopPropagation();
    this.personService.toggleFavorite(this.person().id);
  }
}
