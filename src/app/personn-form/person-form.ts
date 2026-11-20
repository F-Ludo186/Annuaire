import { Component ,inject, signal } from '@angular/core';
import { FormField, FormRoot, form, min, minLength, required, validate } from '@angular/forms/signals';
import { PersonService } from '../services/person.service';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import { Gender, NewPerson } from '../models/person.model';

type PersonFormData = Omit<NewPerson, 'genre'> & { genre: Gender | '' };


@Component({
  imports: [ FormRoot, FormField,MatFormFieldModule, MatInputModule,MatSelectModule, MatButtonModule],
  selector: 'app-person-form',
  styleUrl: './person-form.css',
  templateUrl: './person-form.html',
})
export class PersonForm {
  private readonly personService = inject(PersonService);

  private readonly initialPerson: PersonFormData = {
    genre:"",  
    first: "",
      last: "",
      date: "",
      age: 0,
      email: "",
      city: "",
      state: "",
      country: "",
      phone: "",
      cell: "",
      pictureMedium: "",
  };

  personne = signal<PersonFormData>({ ...this.initialPerson });

  genres = [
    { value: 'male', label: 'Homme' },
    { value: 'female', label: 'Femme' },
  ] as const;

  PersonForm = form(
    this.personne,
    (path) => {
      required(path.pictureMedium, { message: "Merci de saisir l'URL de vortre avatar." });
      required(path.genre, { message: "Merci de selectionner le genre." });
      // prenom
      required(path.first, { message: 'Le prénom est obligatoire.' });
      minLength(path.first, 3, { message: '3 caractères au moins.' });
      validate(path.first, ({ value }) =>
        value().trim().length === 0 ? { kind: 'blank', message: 'Le prénom ne peut pas être composé uniquement d’espaces.' } : undefined,
      );
      // Nom
      required(path.last, { message: 'Le nom est obligatoire.' });
      minLength(path.last, 3, { message: '3 caractères au moins.' });
      validate(path.last, ({ value }) =>
        value().trim().length === 0 ? { kind: 'blank', message: 'Le nom ne peut pas être composé uniquement d’espaces.' } : undefined,
      );
      //age
      required(path.age, { message: "L'age est obligatoire." });
      min(path.age, 0.01, { message:  "L'age  doit dépasser 0." });
      //email
      required(path.email, { message: "L'email est obligatoire." });
            validate(path.email, ({ value }) => {
        const email = value();

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          return {
            kind: 'email',
            message: "L'adresse email n'est pas valide."
          };
        }

        return undefined;
      });
      required(path.city, { message: 'La ville est obligatoire.' });
    },
    { submission: { action: async () => this.send() } }, // lancée à l'envoi, si tout est valide
  );

  error = signal<string | null>(null); 
  
  async send(): Promise<void> {
    const { genre, ...informations } = this.personne();
    if (genre !== 'male' && genre !== 'female') return;

    this.personService.addPersonne({ ...informations, genre });
    this.PersonForm().reset({ ...this.initialPerson });
  }
}
