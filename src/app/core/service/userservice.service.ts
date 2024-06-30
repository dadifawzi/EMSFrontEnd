import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  apiUrl ='http://localhost:3000' ; 
  private isAuthenticated: boolean = false;

  constructor(private http : HttpClient) { 
  }



signin(data:any){
return this.http.post(this.apiUrl+'/user/signin',data) ; 

}

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl+'/user');
  }

  getUserById(id: any){
    return this.http.get(this.apiUrl+'/user/'+id);
  }

  createUser(user: any){
    return this.http.post(this.apiUrl+'/user/create', user);
  }

  updateUser(id: any , user : any){
    return this.http.put(this.apiUrl+'/user/'+id, user);
  }

  deleteUser(userId:any){
    return this.http.delete(this.apiUrl+'/user/'+userId);
  }




   logout() {
      this.isAuthenticated = false ;
       // localStorage.removeItem("myToken");
localStorage.clear() ;

    }

  }

