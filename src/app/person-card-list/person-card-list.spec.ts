import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PersonCardList } from './person-card-list';

describe('PersonCardList', () => {
  let component: PersonCardList;
  let fixture: ComponentFixture<PersonCardList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonCardList],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonCardList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
