import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

const httpOptions= {
	headers: new HttpHeaders({
		'Content-Type': 'application/json',
		//'Access-Control-Allow-Origin' : 'Servlet',
	})
}

@Injectable()
export class DashboardService {
	url: string = 'Servlet'; 
  constructor(private http: HttpClient) { }

  sendData(data: any){
  	return this.http.post(this.url, data, httpOptions)
    .pipe(
      catchError(val => of('I caught: ${val}'))
    );
  }
}