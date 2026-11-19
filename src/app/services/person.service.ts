
import { Injectable, afterNextRender, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, timeout } from 'rxjs';

import { PersonsCard, PersonApi, PeopleResponse } from '../models/person.model';


@Injectable({
    providedIn: 'root'
})
export class PersonService {

    private readonly favoritesStorageKey = 'annuaire-favorites';

    private http = inject(HttpClient);

    private apiUrl = 'https://randomuser.me/api/?seed=cda2&results=30&nat=fr';
    // Les fichiers de `public/` sont servis depuis la racine de l'application.
    private backupUrl = '/people-backup.json';

    readonly persons = signal<PersonApi[]>([]);
    private readonly favoriteIds = signal<Set<string>>(new Set());
    readonly count = computed(() => this.persons().length);
    readonly cards = computed<PersonsCard[]>(() => this.persons().map(person => ({
        id: person.login.uuid,
        first: person.name.first,
        last: person.name.last,
        date: person.dob.date,
        age: person.dob.age,
        email: person.email,
        city: person.location.city,
        state: person.location.state,
        country: person.location.country,
        phone: person.phone,
        cell: person.cell,
        pictureMedium: person.picture.medium,
        favori: this.favoriteIds().has(person.login.uuid)
    })));

    loading = signal(true);                  
    error = signal<string | null>(null);
    readonly loadedFromBackup = signal(false);

    constructor() {
        // localStorage n'existe que dans le navigateur. Lire après le premier rendu
        // évite une différence entre le HTML SSR et l'état restauré côté client.
        afterNextRender(() => {
            try {
                const stored = localStorage.getItem(this.favoritesStorageKey);
                if (!stored) return;

                const ids: unknown = JSON.parse(stored);
                if (Array.isArray(ids) && ids.every(id => typeof id === 'string')) {
                    this.favoriteIds.set(new Set(ids));
                }
            } catch (error) {
                console.warn('Impossible de restaurer les favoris', error);
            }
        });
    }

    async getAll(): Promise<PersonApi[]> {
        this.loading.set(true);
        this.error.set(null);
        this.loadedFromBackup.set(false);
        return this.loadData();
    }

    private async loadData(): Promise<PersonApi[]> {
        try {
            let data: PersonApi[];
            try {
                const response = await firstValueFrom(
                    this.http.get<PeopleResponse>(this.apiUrl).pipe(timeout({ first: 5000 }))
                );
                if (response.results.length > 0) {
                    data = response.results;
                } else {
                    this.loadedFromBackup.set(true);
                    data = await this.loadBackup();
                }
            } catch (apiError) {
                console.warn('API indisponible, chargement de la sauvegarde', apiError);
                this.loadedFromBackup.set(true);
                data = await this.loadBackup();
            }

            this.persons.set(data);
            return data;
        } catch (error) {
            this.error.set(`Impossible de charger l’annuaire : ${this.errorMessage(error)}`);
            this.persons.set([]);
            return [];
        } finally {
            this.loading.set(false);
        }
    }

    private errorMessage(error: unknown): string {
        return error instanceof Error ? error.message : String(error);
    }

    private async loadBackup(): Promise<PersonApi[]> {

        const response = await firstValueFrom(
            this.http.get<PeopleResponse>(this.backupUrl)
        );

        return response.results;
    }

    getById(id: string): PersonsCard | undefined {
        return this.cards().find(person => person.id === id);
    }

    toggleFavorite(id: string): void {
        this.favoriteIds.update(current => {
            const next = new Set(current);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            try {
                localStorage.setItem(this.favoritesStorageKey, JSON.stringify([...next]));
            } catch (error) {
                console.warn('Impossible de sauvegarder les favoris', error);
            }
            return next;
        });
    }
}
