import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlaningService {

apiUrl ="http://localhost:3000" ; 

  constructor(private http : HttpClient) { }

  getplaning(){
    return this.http.get(this.apiUrl+'/planing/');
  }

  getplaningById(id:any){
    return this.http.get(this.apiUrl+'/planing/'+id);
  }

  createplaning(Client: any){
    return this.http.post(this.apiUrl+'/planing/', Client);
  }

  updateplaning( Client : any , id : any){
    return this.http.put(this.apiUrl+'/planing/'+id, Client);
  }

  deleteplaning(id:any){
    return this.http.delete(this.apiUrl+'/planing/'+id);
  }








}
