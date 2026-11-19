import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PersonFavoris } from './person-favoris';

describe('PersonFavoris', () => {
  let component: PersonFavoris;
  let fixture: ComponentFixture<PersonFavoris>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonFavoris],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonFavoris);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
