import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'charset': 'utf-8'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ProxyHttpClientService {

  constructor(private httpClient: HttpClient) { }

  postJson(url: string, data: any): Observable<any> {
    let body = JSON.stringify(data);
    return this.httpClient.post(url, body, httpOptions).pipe(
        catchError(this.handleError)
      );
  }

  postOptions(url: string, data: any, httpOptions: any): Observable<any> {
    return this.httpClient.post(url, data, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  get(url: string, params: HttpParams = null): Observable<any> {
    return this.httpClient.get(url, { params }).pipe(
      catchError(this.handleError)
    );
  }

  put(url: string, data: any): Observable<any> {
    let body = JSON.stringify(data);
    return this.httpClient.put(url, body, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  delete(url: string): Observable<any> {
    return this.httpClient.delete(url).pipe(
      catchError(this.handleError)
    );
  }

  private handleError() {
    return throwError(
      'Sorry, there was an error with server. Try later.');
  }
}
