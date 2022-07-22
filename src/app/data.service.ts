import { Injectable } from '@angular/core';
import { titles } from '../app/data/titles';

export interface Title {
  id: String;
  name: String;
  level_1_title: String | null;
  full_name: String;
  external_id: number;
  season_number: String | null;
  episode_number: String | null;
  title_level: String | null;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  getTitle = (): Title[] => {
    return titles;
  } 
}
