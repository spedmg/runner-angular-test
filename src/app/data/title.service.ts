import { Injectable } from '@angular/core';
import {Title} from './title';
import {Observable, of} from 'rxjs';
import {HttpStatusCode} from '@angular/common/http';
import {Metadata} from './metadata';
import {titles} from './titles';

@Injectable({
  providedIn: 'root'
})
export class TitleService {

  private readonly data: Title[];

  constructor() {
    this.data = titles;
  }

  saveMetadata(metadata: Metadata): Observable<HttpStatusCode> {
    // Should execute POST request
    return of(HttpStatusCode.Ok);
  }

  getTitles(filterText: string, selectedTitles: Title[]): Observable<Title[]> {
    return of(this.data.filter(title => this.hasMatchingValue(title, filterText) && !this.isTitleSelected(title, selectedTitles)));
  }

  private hasMatchingValue(title: Title, filter: string): boolean {
    let result = false;
    Object.values(title).forEach((value: any) => {
      if (JSON.stringify(value)?.toLowerCase().includes(filter!.toLowerCase())) {
        result = true;
        return;
      }
    });
    return result;
  }

  private isTitleSelected(title: Title, selectedTitles: Title[]): boolean {
    return !!selectedTitles.find(selectedTitle => title === selectedTitle);
  }

}
