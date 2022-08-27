import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { titles } from '../data/titles';
import { Title } from '../models/title';

@Injectable({
  providedIn: 'root'
})
export class AutocompleteService {

  constructor(private httpClient: HttpClient) { }

  getTitles(): Observable<Title[]> {
    return of((titles as unknown) as Title[]);
  }

  saveTitles(titles:Title[]): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    const body = JSON.stringify(titles);
    console.log('Saved Titles: ', body)
    return of((titles as unknown) as Title[]);

    // Mimics Form Submission
    // return this.httpClient.post(`<INSERT URL>/titles`, body, {'headers':headers});
  }
}
