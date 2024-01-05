import { Injectable } from '@angular/core';
import { HttpClient, HttpContext, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class CommonHttpService {
  constructor(private http: HttpClient) {}
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      //this.log(`${operation} failed: ${error.message}`);
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
     // return of(result as T);
     return of(error as T);

    };
  }

  //baseUrl = 'http://43.205.33.156:8082';//[Dev] 
  //baseUrl = 'http://3.7.123.122:8082';//[Test]
  baseUrl = 'http://3.110.239.158:8082'; //[TESTING]
  
  baseUrl_company = 'http://3.109.100.117:8080/MBLWeb'; //Web server
  ReportUrl = 'http://43.205.33.156:7777/birt-viewer'; //DEV REPORT server
  //Get
  GetAll(endpont: string,token:any=null): Observable<any> {
    return this.http.get<any>(this.baseUrl + endpont
      , {headers: new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer ' + token }),}
    ).pipe(
      tap((_) => {
        console.log(_);
        console.log(`Get all`);
      }),
      catchError(this.handleError<any>(`Getall `))
    );
  }
  GetSendAll(endpont: string,data:any,token:any=null): Observable<any> {
    return this.http.get<any>(this.baseUrl + endpont + JSON.stringify(data), {headers: new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer ' + token }),}).pipe(
      tap((_) => {
        console.log(_);
        console.log(`Get all`);
      }),
      catchError(this.handleError<any>(`Getall `))
    );
  }
  GetAll_company(endpont: string,token:any=null): Observable<any> {
    return this.http.get<any>(this.baseUrl_company + endpont, {headers: new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer ' + token }),}).pipe(
      tap((_) => {
        console.log(_);
        console.log(`Get all`);
      }),
      catchError(this.handleError<any>(`Getall `))
    );
  }

  /** Get: Get the hero on the server based on Id*/
  GetById(endpont: string, id: any,token:any=null): Observable<any> {
    return this.http.get<any>(this.baseUrl + endpont
      , {
      headers: new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer ' + token }),
    }
    ).pipe(
      tap((_) => {
        console.log(_);
        console.log(`fetched by id=${id}`);
      }),
      catchError(this.handleError<any>(`Get by id=${id}`))
    );
  }

  GetById_company(endpont: string, id: any,token:any=null): Observable<any> {
    return this.http.get<any>(this.baseUrl_company + endpont, {headers: new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer ' + token }),}).pipe(
      tap((_) => {
        console.log(_);
        console.log(`fetched by id=${id}`);
      }),
      catchError(this.handleError<any>(`Get by id=${id}`))
    );
  }


  /** PUT: update the hero on the server */
  Update(endpont: string, res: any): Observable<any> {
    return this.http
      .put(this.baseUrl + endpont, res, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .pipe(
        tap((_) => console.log(`updated by id=${res.id}`)),
        catchError(this.handleError<any>('updated'))
      );
  }

  Insert_Company_old(endpont: string, hero: any): Observable<any> {
    return this.http
      .post<any>(this.baseUrl_company + endpont, hero, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .pipe(
       // tap((res: any) => console.log(`added w/ id=${res}`)),
       // catchError(this.handleError<any>('added'))
       catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Error: ${error.error.message}`;
      } else {
          // server-side error
          errorMessage = `Error Status: ${error.status}\nMessage:  ${error.error.message == undefined ? error.error.errorMessage : error.error.message}`;
        }
        console.log(errorMessage);
        return throwError(errorMessage);
     // tap((res: any) => console.log(`added w/ id=${res}`)),
     // catchError(this.handleError<any>('added'))
      })
      );
  }
  Insert_company(endpont: string, hero: any,token:any=null): Observable<any> {
    return this.http
      .post<any>(this.baseUrl_company + endpont, hero
        , {
        headers: new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer ' + token }),
      }
      )
      .pipe(
       // tap((res: any) => console.log(`added w/ id=${res}`)),
       // catchError(this.handleError<any>('added'))
       catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Error: ${error.error.message}`;
      } else {
          // server-side error 'Error Status: ${error.status}\n'
          errorMessage = `Message:  ${error.error.message == undefined ? error.error.errorMessage : error.error.message}`;
        }
        console.log(errorMessage);
        return throwError(errorMessage);
     // tap((res: any) => console.log(`added w/ id=${res}`)),
     // catchError(this.handleError<any>('added'))
      })
      );
  }

  /** POST: add a new hero to the server */
  Insert(endpont: string, hero: any,token:any=null): Observable<any> {
    return this.http
      .post<any>(this.baseUrl + endpont, hero
        , {
        headers: new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer ' + token }),
      }
      )
      .pipe(
       // tap((res: any) => console.log(`added w/ id=${res}`)),
       // catchError(this.handleError<any>('added'))
       catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Error: ${error.error.message}`;
      } else {
          // server-side error 'Error Status: ${error.status}\n'
          errorMessage = `Message:  ${error.error.message == undefined ? error.error.errorMessage : error.error.message}`;
        }
        console.log(errorMessage);
        return throwError(errorMessage);
     // tap((res: any) => console.log(`added w/ id=${res}`)),
     // catchError(this.handleError<any>('added'))
      })
      );
  }

  /** DELETE: delete the hero from the server */
  Delete(endpont: string, id: number): Observable<any> {
    return this.http
      .delete<any>(this.baseUrl + endpont, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .pipe(
        tap((_) => console.log(`deleted by id=${id}`)),
        catchError(this.handleError<any>('deleted', null))
      );
  }
  GetAllResponseText(endpont: string,token:any=null): Observable<any> {
    //return this.http.get(this.baseUrl + endpont, { responseType: 'text' }
    return this.http.get(this.baseUrl + endpont, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer ' + token }),
    }).pipe(
      tap((_) => {
        console.log(_);
        console.log(`Get all`);
      }),
      catchError(this.handleError<any>(`Getall `))
    );
  }
  GetByResponseType(endpont: string,responsetype:any,token:any=null): Observable<any> {
    //return this.http.get(this.baseUrl + endpont, { responseType: responsetype }
    return this.http.get(this.baseUrl + endpont, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer ' + token }),
    }).pipe(
      tap((_) => {
        console.log(_);
        console.log(`Get all`);
      }),
      catchError(this.handleError<any>(`Getall `))
    );
  }
  uploadFile(endpont: string,file:any,token:any=null):Observable<any> {
  
    // Create form data
     //const formData = new FormData(); 
      
    // Store form name as "file" with file data
    //formData.append("file", file, file.name)
      
    // Make http post request over api
    // with formData as req
    return this.http.post(this.baseUrl+endpont,file, {
      headers: new HttpHeaders({ 
        //'Accept': 'application/json',
       // 'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + token ,
        'responseType': 'arraybuffer',
       // "mimeType": "multipart/form-data"
    })
    })
    // return this.http.post(this.baseUrl+endpont, file, {
    //   headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data','Authorization': 'Bearer ' + token }),
    // })
}

// uploadFile_(endpont: string,file:any,header:any,token:any=null):Observable<any> {
//   return this.http.post(this.baseUrl+endpont, file, {
//     headers: new HttpHeaders({ 
//       'Authorization': 'Bearer ' + token ,
//       'responseType': 'arraybuffer',
//     }),
//   })
// }

uploadFile_(endpont: string,file:any,header:any,token:any=null):Observable<any> {
  return this.http.post(this.baseUrl+endpont, file, {
    headers: new HttpHeaders({ 
      'Authorization': 'Bearer ' + token ,
    }),
    responseType: 'blob'
  })
}


downloadFile(url: string,token:any=null): Observable<Blob> {
  return this.http.get(this.baseUrl +url, {
    headers: new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer ' + token }),
    responseType: 'blob'
  })
}

}
