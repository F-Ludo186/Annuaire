import { Component, computed, inject,signal } from '@angular/core';
import { PersonService } from '../services/person.service';
import { PersonCard } from '../person-card/person-card';
import { AsyncState } from '../async-state/async-state';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import { Gender } from '../models/person.model';

@Component({
  imports: [ PersonCard, AsyncState, MatInputModule, MatFormFieldModule,MatButtonModule ,MatIconModule, MatSelectModule],
  selector: 'app-person-card-list',
  styleUrl: './person-card-list.css',
  templateUrl: './person-card-list.html',
})
export class PersonCardList {
  private readonly personService = inject(PersonService);

  persons = this.personService.cards
  loading = this.personService.loading;                  
  error = this.personService.error;     
   
  filter = signal('');
  
  genres = [
    { value: '', label: '' },
    { value: 'male', label: 'Homme' },
    { value: 'female', label: 'Femme' },
  ] as const;

  genre = signal<Gender | ''>('');

  affichagePersonne = computed(() => {
    const value = this.filter().trim().toLowerCase();
    const genre = this.genre();

    if (!value && !genre ) {
        return this.persons();
    }

    return this.persons().filter(person => {
      const nomCorrespond = `${person.first} ${person.last}`
        .toLowerCase()
        .includes(value);
      const genreCorrespond = !genre || person.genre === genre;

      return nomCorrespond && genreCorrespond;
    });
  }); 

  // skeletom
  readonly skeletonCards = Array.from({ length: 10 });
  // gestion pagination
  readonly pageSize = 10;
  readonly page = signal(0);

  readonly pageCount = computed(() =>
    Math.max(1, Math.ceil(this.affichagePersonne().length / this.pageSize))
  );

  readonly personnesPage = computed(() => {
    const debut = this.page() * this.pageSize;
    return this.affichagePersonne().slice(debut, debut + this.pageSize);
  });

  filtrerParGenre(genre: Gender | ''): void {
    this.genre.set(genre);
    this.page.set(0);
  }

  rechercher(value: string): void {
    this.filter.set(value);
    this.page.set(0); // Revenir à la première page après une recherche
  }
}
