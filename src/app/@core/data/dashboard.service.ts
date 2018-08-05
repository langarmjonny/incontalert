import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

const httpOptions= {
	headers: new HttpHeaders({
		'Content-Type': 'text/html',
		//'Access-Control-Allow-Origin' : 'http://localhost:8080/RobotinoApp/Servlet',
	})
}

@Injectable()
export class DashboardService {
	url: string = 'http://localhost:8080/RobotinoApp/Servlet'; 
  constructor(private http: HttpClient) { }

  sendData(data: any){
  	return this.http.post(this.url, data, httpOptions)
    /*.pipe(
      catchError(val => of('I caught:'+val));
    )*/;
  }

}