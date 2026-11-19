import { Component, inject, input } from '@angular/core';
import { PersonService } from '../services/person.service';
import { PersonsCard } from '../models/person.model';
import {MatCardModule} from '@angular/material/card';

@Component({
  imports: [MatCardModule],
  selector: 'app-person-card',
  styleUrl: './person-card.css',
  templateUrl: './person-card.html',
})
export class PersonCard {
  cart = inject(PersonService);
  person = input.required<PersonsCard>();
}
