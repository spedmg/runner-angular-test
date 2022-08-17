import { inject, TestBed } from "@angular/core/testing";
import { DataService, Title } from './data.service';

describe('DataService', () => {
  
  let service: DataService;
  
  beforeEach( () => {
    
    TestBed.configureTestingModule({
      providers: [DataService],
    });
    service = TestBed.inject(DataService);
    
  });
  
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`should fetch titles`, (inject([DataService],
    (dataService: DataService) => {
      service.getTitle();
      expect(dataService.getTitle().length).toBeGreaterThan(0);
      
    })));
  });