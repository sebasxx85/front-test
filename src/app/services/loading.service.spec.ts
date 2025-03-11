import { TestBed } from '@angular/core/testing';
import { LoadingService } from './loading.service';

describe('LoadingService', () => {
  let service: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have initial loading status as false', (done) => {
    service.isLoading$.subscribe((status) => {
      expect(status).toBeFalse();
      done();
    });
  });

  it('should update loading status', (done) => {
    service.setIsLoading(true);

    service.isLoading$.subscribe((status) => {
      expect(status).toBeTrue();
      done();
    });
  });
});
