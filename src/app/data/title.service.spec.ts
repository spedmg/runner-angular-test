import {TestBed} from '@angular/core/testing';

import {TitleService} from './title.service';
import {Title} from "./title";
import {titles} from "./titles";

describe('TitleService', () => {
  let service: TitleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TitleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getTitles', () => {
    let expectedTitles: Title[];
    let result: Title[];

    beforeEach(() => {
      expectedTitles = [];
      result = [];
    })

    afterEach(() => {
      expect(result.length).toEqual(expectedTitles.length);
    });


    it('should return all titles including substring PRIZES', () => {
      expectedTitles = [
        {
          id: '16075',
          name: 'PRIZES',
          level_1_title: 'WHEEL OF FORTUNE',
          full_name: 'WHEEL OF FORTUNE // PRIZES',
          external_id: 950975,
          season_number: '1',
          episode_number: null,
          title_level: null
        },
        {
          id: '16076',
          name: 'WHEEL OF FORTUNE FOR PRIZES - MOBILE GAME',
          level_1_title: 'WHEEL OF FORTUNE',
          full_name:
            'WHEEL OF FORTUNE // PRIZES // EPISODE #0101 // WHEEL OF FORTUNE FOR PRIZES - MOBILE GAME',
          external_id: 950976,
          season_number: '1',
          episode_number: '101',
          title_level: null
        },
        {
          id: '684229',
          name: 'WHEEL OF FORTUNE FOR PRIZES DIGITAL MERCHANDISE',
          level_1_title: 'WHEEL OF FORTUNE FOR PRIZES DIGITAL MERCHANDISE',
          full_name: 'WHEEL OF FORTUNE FOR PRIZES DIGITAL MERCHANDISE',
          external_id: 823670,
          season_number: null,
          episode_number: null,
          title_level: null
        }
      ];

      // act
      service.getTitles('PRIZES', []).subscribe((titles: Title[]) => result = titles);

      // assert
      expect(result).toEqual(expectedTitles);
    });

    it('should return title with external_id equal to 796487', () => {
      // arrange
      expectedTitles = titles.filter(title => title.external_id === 796487);

      // act
      service.getTitles('796487', []).subscribe((titles: Title[]) => result = titles);

      // assert
      expect(result).toEqual(expectedTitles);
    });

    it('should return all titles including substring 796487 and should exclude titles that have been selected', () => {
      // arrange
      let selectedTitle: Title[] = titles.filter(title => title.external_id === 796487);

      // act
      service.getTitles('796487', selectedTitle).subscribe((titles: Title[]) => result = titles);

      // assert
      expect(result).toEqual(expectedTitles)
    });
  });
});
