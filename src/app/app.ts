import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { PersonService } from './services/person.service';

@Component({
  imports: [RouterOutlet, Header],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('Annuaire');

  personService = inject(PersonService);

  ngOnInit() {
    this.personService.getAll();
  }
}
