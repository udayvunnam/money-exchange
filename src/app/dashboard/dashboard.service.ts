import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ConvertHistory, ConvertInput, ConvertOutput } from '../shared/models';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  readonly api = environment.apiUrl;
  constructor(private http: HttpClient) {}

  public getCurrencies(): Observable<any> {
    return this.http.get(`${this.api}/currency`);
  }

  public getUsage(limit = 10): Observable<ConvertHistory[]> {
    const params = new HttpParams().set('limit', limit.toString());
    return this.http.get<ConvertHistory[]>(`${this.api}/usage`, { params });
  }

  public convert(convertInput: ConvertInput): Observable<ConvertOutput> {
    return this.http.post<ConvertOutput>(`${this.api}/convert`, convertInput);
  }
}
