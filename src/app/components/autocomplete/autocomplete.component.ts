import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Title } from '../../models/title';
import { AutocompleteService } from '../../services/autocomplete.service';

/**
 * @title Display value autocomplete
 */
@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css']
})
export class AutocompleteComponent implements OnInit {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  isSaved = false;
  filteredTitles: Observable<string[]> | undefined;
  titles: string[] = [];
  fullTitles: string[] = [];
  allTitles: string[] = [];
  allTitlesData: Title[] = [];
  titlesToSave: Title[] = [];
  titlesForm: FormGroup;

  @ViewChild('titleInput') titleInput!: ElementRef<HTMLInputElement>;

  constructor(private autocompleteService: AutocompleteService, private formBuilder: FormBuilder) {
    this.titlesForm = this.formBuilder.group({
      titleCtrl: [''],
      selectedTitles: [null, Validators.required],
    });

    this.filteredTitles = this.titlesForm.get('titleCtrl')?.valueChanges.pipe(
      startWith(null),
      map((title: string | null) => {
        return title && title.length >= 3 ? this._filter(title) : this.allTitles.slice()
      }),
    );
  }

  ngOnInit() {
    this.autocompleteService.getTitles().subscribe((titles) =>{
      this.allTitlesData = titles.map((title) =>{
        this.allTitles.push(title.name);
        return title;
      })
    });
  }

  remove(fullTitle: string): void {
    this.isSaved = false;
    const index = this.fullTitles.indexOf(fullTitle);

    if (index >= 0) {
      this.titles = this.allTitlesData.filter((titles: Title) => {
        return this.fullTitles.indexOf(titles.full_name) >= 0;
      }).map(titles=>titles.name);

      this.fullTitles.splice(index, 1);
      this.titles.splice(index, 1);
      this.titlesForm.get('selectedTitles')?.setValue(this.fullTitles ? this.fullTitles : null);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.isSaved = false;
    this.titles.push(event.option.viewValue);
    this.fullTitles = this.allTitlesData.filter((titles: Title) => {
      return this.titles.indexOf(titles.name) >= 0;
    }).map(titles=>titles.full_name);
    this.titleInput.nativeElement.value = '';
    this.titlesForm.get('titleCtrl')?.setValue(null);
    this.titlesForm.get('selectedTitles')?.setValue(this.fullTitles ? this.fullTitles : null);
  }

  save() {
    this.titlesForm.get('selectedTitles')?.markAsTouched();
    this.titlesToSave = this.allTitlesData.filter((titles: Title) => {
      return this.titlesForm.get('selectedTitles')!.value.indexOf(titles.full_name) >= 0;
    });
    this.autocompleteService.saveTitles(this.titlesToSave);
    this.isSaved = true;
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allTitles.filter(title => title.toLowerCase().includes(filterValue));
  }
}
