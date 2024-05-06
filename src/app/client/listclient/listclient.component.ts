import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ClientserviceService } from '../../core/service/clientservice.service';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-listclient',
  standalone: true,
  imports: [RouterLink,FormsModule],
  templateUrl: './listclient.component.html',
  styleUrl: './listclient.component.css'
})
export class ListclientComponent implements OnInit {
  
  clients : any  ; 
  searchQuery :string = '' ;
  dbclients : any  ; 
  constructor(private _client:ClientserviceService){}




  ngOnInit(): void {
this.getClients() ; 
  }


  getClients(){
    this._client.getClients().subscribe({
      next:(res)=>{
        this.clients = res ; 
        this.dbclients = res ; 
        console.log('clients get from back are '+this.clients);
        
      },error:(err)=>{
        console.log(err);
        
      }
    })
  }

  deleteClient(id:any){

    Swal.fire({
  position:"center" , 
  title: "Do you want to delete this Client",
  showDenyButton: true,
  confirmButtonText: "Yes",
}).then((result) => {
  if (result.isConfirmed) {
    this._client.deleteClient(id).subscribe({
      next:(res)=>{
        console.log(res);
        this.ngOnInit() ; 
      },error:(err)=>{console.log(err);
      }
    })

  }
  })

}

  searchCustomers() {
    console.log("changes "+this.searchQuery);
    
    if(this.searchQuery.length > 0){
    this.clients = this.dbclients.filter((data: { fullname: string; adress: string; }) =>
      data.fullname.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      data.adress.toLowerCase().includes(this.searchQuery.toLowerCase()) 
     
    );
  }
  };


  searchCustomers2(){
  if(this.searchQuery.length <= 1){
    this.ngOnInit() ;
  }
  }

  




}
