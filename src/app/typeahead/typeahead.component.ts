import {Component} from '@angular/core';
import {FormControl} from "@angular/forms";
import {Title} from "../data/title";
import {distinctUntilChanged, Observable, of} from "rxjs";
import {TitleService} from "../data/title.service";
import {Metadata} from "../data/metadata";

@Component({
  selector: 'app-typeahead',
  templateUrl: './typeahead.component.html',
  styleUrls: ['./typeahead.component.css']
})
export class TypeaheadComponent {
  title: FormControl = new FormControl('');
  selection: Title[] = [];

  constructor(private titleService: TitleService) {
  }

  get filteredTitles(): Observable<Title[]> {
    if (this.title.value?.length >= 3) {
      return this.titleService.getTitles(this.title.value, this.selection).pipe(distinctUntilChanged());
    }
    return of([]);
  }

  removeTitle(index: number): void {
    this.selection.splice(index, 1);
  }

  updateSelection(selectedTitle: Title) {
    this.selection.push(selectedTitle);
  }

  save(): void {
    if (this.selection.length > 0) {
      // Mock Metadata
      let metadata: Metadata = {
        info: 'Title Selection',
        userId: 123456789,
        userName: 'HA',
        lastDateModified: new Date(),
        thumbnails: undefined,
        data: JSON.stringify(this.selection)
      };

      this.titleService.saveMetadata(metadata).subscribe(/* Nothing to do here */);
    }
  }

}

