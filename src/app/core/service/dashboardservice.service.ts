import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DashboardserviceService {

  apiUrl = "http://localhos:3000"

  constructor(private http: HttpClient) { }

  getHomeData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  lockMission(i: number):Observable<any> {
    console.log("locking mission: ",i)
return this.http.post<number>(this.apiUrl,i);
  }

  validateission(i: number) {
    return this.http.post<number>(this.apiUrl,i);
  }

  deleteMission(i: number) {
    console.log("locking mission: ",i)
    return this.http.delete<number>(this.apiUrl);


  }

}
