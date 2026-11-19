import { Component,computed,  inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import { PersonService } from '../services/person.service';

@Component({
  imports: [RouterLink,MatCardModule],
  selector: 'app-person-detail',
  styleUrl: './person-detail.css',
  templateUrl: './person-detail.html',
})
export class PersonDetail {
  readonly personneService = inject(PersonService);

  id = input.required<string>(); 
  
  personne = computed(() => this.personneService.getById(this.id()));

  changefav(event: MouseEvent): void {
    event.stopPropagation();
    this.personneService.toggleFavorite(this.id());
  }
}
