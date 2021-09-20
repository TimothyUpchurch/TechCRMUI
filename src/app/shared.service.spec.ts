import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { SharedService } from './shared.service';

describe('SharedService', () => {
  let service: SharedService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(SharedService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  })

  it("should get all customers", () => {
    const dummyCustomers:any = [
      {customerId: '1', firstName: 'Timothy', lastName: 'Upchurch', age: 26, sex: 'M', email: 'timmyupc@gmail.com', dateAdded: '2021-09-18'}
    ]

    service.getCustomers().subscribe(customers => {
      expect(customers.length).toBe(1);
      expect(customers).toEqual(dummyCustomers);
    })

    const request = httpMock.expectOne(`${service.APIUrl}customer`);

    expect(request.request.method).toBe('GET');

    request.flush(dummyCustomers);
  })
});
