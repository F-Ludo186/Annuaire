import { Component, inject, input } from '@angular/core';
import { PersonService } from '../services/person.service';

@Component({
  imports: [],
  selector: 'app-header',
  styleUrl: './header.css',
  templateUrl: './header.html',
})
export class Header {
  private readonly personService = inject(PersonService);
  title = input('');
  personCount = input(0);
  loading = this.personService.loading;                  
  error = this.personService.error;   
}  
