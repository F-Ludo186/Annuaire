import { Component, inject } from '@angular/core';
import { PersonService } from '../services/person.service';

@Component({
  imports: [],
  selector: 'app-footer',
  styleUrl: './footer.css',
  templateUrl: './footer.html',
})
export class Footer {
  private readonly personService = inject(PersonService);
   loadedFromBackup = this.personService.loadedFromBackup;
}
