import { afterNextRender, Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { PersonService } from './services/person.service';
import { Footer } from './footer/footer';
import { MobileNav } from './mobile-nav/mobile-nav';
import { LoadingService } from './services/loading.service';

@Component({
  imports: [RouterOutlet, Header, Footer, MobileNav],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('Annuaire');
  readonly loading = inject(LoadingService);
  personService = inject(PersonService);

  constructor() {
    // Ne pas lancer les requêtes HTTP pendant le rendu SSR : l'injecteur serveur
    // peut être détruit avant que le fallback ne soit demandé.
    afterNextRender(() => {
      void this.personService.getAll();
    });
  }
}
