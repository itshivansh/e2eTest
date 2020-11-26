import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MovieService } from '../src/app/services/movie.service';
import {Movie} from 'src/app/models/Movie';

const movies:Movie[]=[
    {
      "title": "ABC",
      "story": "ABC's story goes here"
    },
    {
      "title": "BCD",
      "story": "BCD's story goes here"
    },
    {
      "title": "CDE",
      "story": "CDE's story goes here"
    }
]

describe('MovieService', () => {
  let httpMock: HttpTestingController;
  let service: MovieService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MovieService],
    });
    httpMock = TestBed.get(HttpTestingController);
    service = TestBed.get(MovieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // test the service for addMovie method
  it('addMovie() method should add movie',()=>{
    const movie:Movie={
      "title": "ABC",
      "story": "ABC's story goes here"
    };
    service.addMovie(movie).subscribe(data=>{
      expect(data.data.length).toBe(3);
      expect(data.data).toEqual(movies);
    });
    const req=httpMock.expectOne('http://localhost:3000/movies');
    expect(req.request.method).toEqual('POST');
    expect(req.request.headers.get('Content-Type')).toEqual('application/json');
    req.flush({data:movies});
  });
 
  // test the service for getMovie method
  it('getMovies() method should get all movies',()=>{ 
    service.getMovies().subscribe(data=>{
      expect(data.data.length).toBe(3);
      expect(data.data).toEqual(movies);
    });
    const req=httpMock.expectOne('http://localhost:3000/movies');
    expect(req.request.method).toEqual('GET');
    req.flush({data:movies});
  });
  // test the service for deleteMovie method
  it('deleteMovie() method should delete movie',()=>{
    service.deleteMovie(1).subscribe();
    const req=httpMock.expectOne('http://localhost:3000/movies/1/');
    expect(req.request.method).toEqual('DELETE');
    req.flush({data:movies});
  });

  afterEach( () => {
       httpMock.verify();
    });
});
