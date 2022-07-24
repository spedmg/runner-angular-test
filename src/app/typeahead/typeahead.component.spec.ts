import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TypeaheadComponent} from './typeahead.component';
import {TitleService} from '../data/title.service';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

describe('TypeaheadComponent', () => {
  let component: TypeaheadComponent;
  let fixture: ComponentFixture<TypeaheadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatAutocompleteModule],
      declarations: [TypeaheadComponent],
      providers: [TitleService]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TypeaheadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
