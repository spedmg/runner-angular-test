import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataService } from '../data.service';
import { TypeaheadSearchComponent } from './typeahead-search.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('TypeaheadSearchComponent', () => {
  let typeaheadComponent: TypeaheadSearchComponent;
  let fixture: ComponentFixture<TypeaheadSearchComponent>;
  let service: DataService;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [
        MatAutocompleteModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      providers: [{
        provide: DataService
      }],
      declarations: [ TypeaheadSearchComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypeaheadSearchComponent);
    typeaheadComponent = fixture.componentInstance;
    service = fixture.debugElement.injector.get(DataService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(typeaheadComponent).toBeTruthy();
  });

  it('should get titles from the service', () => {
    expect(typeaheadComponent.titles.length).toBeGreaterThan(0); 
  })

  it('should not display options when less then 3 letters are typed', async () => {
    
    let inputElement = fixture.nativeElement.querySelector("input");
    inputElement.dispatchEvent(new Event('focusin'));
    inputElement.value = "Pr";
    inputElement.dispatchEvent(new Event('input'));

    await fixture.whenStable();
    fixture.detectChanges();

    const matOptElement = document.querySelectorAll('mat-option');
    expect(matOptElement.length).toEqual(0);
  });

  it('should display options when 3 or more letters', async () => {
    
    let inputElement = fixture.nativeElement.querySelector("input");
    inputElement.dispatchEvent(new Event('focusin'));
    inputElement.value = "Pri";
    inputElement.dispatchEvent(new Event('input'));

    await fixture.whenStable();
    fixture.detectChanges();

    const matOptElement = document.querySelectorAll('mat-option');
    expect(matOptElement.length).toEqual(1);
  });

  it('should display card when a title is selected', async () => {
     
    let inputElement = fixture.nativeElement.querySelector("input");
    inputElement.dispatchEvent(new Event('focusin'));
    inputElement.value = "Wheel";
    inputElement.dispatchEvent(new Event('input'));

    await fixture.whenStable();
    fixture.detectChanges();

    const matOptElement = document.querySelectorAll('mat-option');
    const optionToClick = matOptElement[0] as HTMLElement;
    optionToClick.click();
    
    fixture.detectChanges();
    
    let cardElement = fixture.nativeElement.querySelectorAll(".selected-results");

    expect(cardElement.length).toEqual(1);
  });

  it('should remove card when close icon is clicked', async () => {
    
    let inputElement = fixture.nativeElement.querySelector("input");
    inputElement.dispatchEvent(new Event('focusin'));
    inputElement.value = "Wheel";
    inputElement.dispatchEvent(new Event('input'));

    await fixture.whenStable();
    fixture.detectChanges();

    const matOptElement = document.querySelectorAll('mat-option');
    const optionToClick = matOptElement[0] as HTMLElement;
    optionToClick.click();
    
    fixture.detectChanges();
    
    let cardActionElement = document.querySelectorAll("mat-card-actions");
    const cardAction = cardActionElement[0] as HTMLElement;
  
    cardAction.click();
    
    fixture.detectChanges();

    let cardElement = fixture.nativeElement.querySelectorAll(".selected-results");

    expect(cardElement.length).toEqual(0);
  });
});
