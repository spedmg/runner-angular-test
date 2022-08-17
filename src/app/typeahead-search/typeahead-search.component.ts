import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { distinctUntilChanged, map, Observable, of, startWith, switchMap, skipWhile } from 'rxjs';
import { DataService, Title } from '../data.service';


@Component({
  selector: 'app-typeahead-search',
  templateUrl: './typeahead-search.component.html',
  styleUrls: ['./typeahead-search.component.css']
})
export class TypeaheadSearchComponent implements OnInit {

  searchControl = new FormControl();
  titles: Title[] = [];
  selected: Title[] = [];
  unselected: Title[] = [];
  filteredTitles: Observable<Title[]>;

  constructor(private service : DataService){
    this.filteredTitles = this.searchControl.valueChanges.pipe(
      skipWhile(val => val.length <= 2),
      startWith(''),
      distinctUntilChanged(),
      switchMap(val => {
        return this.filter(val)   
      }) 
    )
  }

  ngOnInit(){
    this.titles = this.service.getTitle();
    this.unselected = [...this.titles];   
  }
  filter(val: string): Observable<Title[]> {
    return of(this.unselected)
      .pipe(
        map(response => response.filter(option => { 
          return option.name.toLowerCase().indexOf(val.toLowerCase()) === 0 && val.length >=2
        }))
      )
  } 

  onSelection(e: any){
    const selection = this.titles.filter(title => title.name == e.option.value);
    this.selected.push(selection[0]);
    this.getUnselected();
    this.searchControl.setValue('');
  }
  
  removeTitle(item: Title){
    const selection = this.selected.filter(title => title.name != item.name);
    this.selected = selection;
    this.getUnselected();
  }

  getUnselected(){
    this.unselected = this.titles.filter(title => this.selected.every(item => item.id != title.id));
  }

}
