import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { MoviesListComponent } from '../src/app/movies-list/movies-list.component';
import { MovieService } from 'src/app/services/movie.service';
import { of } from 'rxjs';

describe('MoviesListComponent', () => {
  let component: MoviesListComponent;
  let fixture: ComponentFixture<MoviesListComponent>;
  let movieService: MovieService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoviesListComponent ],
      imports: [HttpClientModule],
      providers: [ MovieService]

    })
    .compileComponents();
    movieService = TestBed.get(MovieService);
    spyOn(movieService, 'deleteMovie').and.returnValue(of(''));
    spyOn(movieService, 'getMovies').and.returnValue(of(''));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // test to check ngOnInit method existence
  it('ngOnInit() should exists', () => {
    expect(component.ngOnInit).toBeTruthy();
  
  });

     // test to check deleteMovie is calling MovieService or not
  it('deleteMovie() should call MovieService to delete an Movie', () => {
    component.deleteMovie(1);
    expect(movieService.deleteMovie).toHaveBeenCalled();
    });

  // test to check ngOnInit is calling MovieService or not
  it('ngOnInit() should call MovieService to get all Movies', () => {
  component.ngOnInit();
  expect(movieService.getMovies).toHaveBeenCalled();
  });
});
