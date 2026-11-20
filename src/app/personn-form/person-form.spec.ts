import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PersonnForm } from './personn-form';

describe('PersonnForm', () => {
  let component: PersonnForm;
  let fixture: ComponentFixture<PersonnForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonnForm],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonnForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
