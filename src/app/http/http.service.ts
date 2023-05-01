import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APIUrls } from 'src/constants';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  public get(url: any): Observable<any> {
    return this.http.get((APIUrls as any)[url],{ headers: {'url-Name':'ecommerce'} }).pipe(map(res => res));
  }

  public post(url: any,formData: any): Observable<any> {
    return this.http.post((APIUrls as any)[url],formData,{ headers: {'url-Name':'ecommerce'} }).pipe(map(res => res));
  }

  public postResponse(url: any,formData: any,resData: any): Observable<any> {
    return this.http.post((APIUrls as any)[url],formData,resData).pipe(map(res => res));
  }

}
