import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ClientserviceService {

 
apiUrl ="http://localhost:3000" ; 

  constructor(private http : HttpClient) { }

  getClients(){
    return this.http.get(this.apiUrl+'/client/');
  }

  getClientById(id:any){
    return this.http.get(this.apiUrl+'/client/'+id);
  }

  createClient(Client: any){
    return this.http.post(this.apiUrl+'/client/', Client);
  }

  updateClient( Client : any , id : any){
    return this.http.put(this.apiUrl+'/client/'+id, Client);
  }

  deleteClient(id:any){
    return this.http.delete(this.apiUrl+'/client/'+id);
  }

}
