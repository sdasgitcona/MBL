import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class AddressService {
  constructor(private http: HttpClient) {}
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.log(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      //this.log(`${operation} failed: ${error.message}`);
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  accesstoken: string =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJhZnRhYmFsYW0yNTE5OUBnbWFpbC5jb20iLCJhcGlfdG9rZW4iOiI4T0ZmZDRRTHN6UUk3MGt5N0J6VnQ5aV9xLTJnSldScy1zZUo5NHdGcjJmRzZOS0dSNGtQdXNwTzhuWG1yTlVaclJrIn0sImV4cCI6MTY1OTA3NDM4M30.3P8MavKPzF_Q8EGcMe8XuxrToKJX4mNutEnTiuoLxMM';
  // Fetch access token
  GetAccessToken(): Observable<any> {
    return this.http
      .get<any>('https://www.universal-tutorial.com/api/getaccesstoken', {
        headers: new HttpHeaders({
          Accept: 'application/json',
          'api-token':
            '8OFfd4QLszQI70ky7BzVt9i_q-2gJWRs-seJ94wFr2fG6NKGR4kPuspO8nXmrNUZrRk',
          'user-email': 'aftabalam25199@gmail.com',
        }),
      })
      .pipe(
        tap((_) => {
          console.log(_);
          this.accesstoken = _.auth_token;
        }),
        catchError(this.handleError<any>(`Getall `))
      );
  }
  //CountryList
  GetCountryList(): Observable<any> {
    return this.http
      .get<any>('https://www.universal-tutorial.com/api/countries/', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + this.accesstoken,
          Accept: 'application/json',
        }),
      })
      .pipe(
        tap((_) => {}),
        catchError(this.handleError<any>(`Getall `))
      );
  }
  //State List
  GetStateList(country: string): Observable<any> {
    return this.http
      .get<any>('https://www.universal-tutorial.com/api/states/' + country, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + this.accesstoken,
          Accept: 'application/json',
        }),
      })
      .pipe(
        tap((_) => {}),
        catchError(this.handleError<any>(`Getall `))
      );
  }
  //City List
  GetCityList(state: string): Observable<any> {
    return this.http
      .get<any>('https://www.universal-tutorial.com/api/cities/' + state, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + this.accesstoken,
          Accept: 'application/json',
        }),
      })
      .pipe(
        tap((_) => {}),
        catchError(this.handleError<any>(`Getall `))
      );
  }
}
