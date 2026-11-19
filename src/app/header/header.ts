import { Component, inject, input } from '@angular/core';
import { PersonService } from '../services/person.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  imports: [MatIconModule, MatButtonModule, RouterLink],
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
