import { Component, OnInit } from '@angular/core';
import { UserserviceService } from '../../core/service/userservice.service';
import { RouterLink } from '@angular/router';
import  Swal from 'sweetalert2' ; 

@Component({
  selector: 'app-listuser',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './listuser.component.html',
  styleUrl: './listuser.component.css'
})
export class ListuserComponent implements OnInit{

 users: any[] = [];
 role : any ; 
constructor(private _user:UserserviceService){}

  ngOnInit(): void {
this.getusers(); 
this.role = localStorage.getItem('Role') ;

}

getusers(){

let id = localStorage.getItem('ID') ; 
let role = localStorage.getItem('Role') ; 
console.log(role);

if(role =='admin'){
  console.log('this is an admin');
  this._user.getUsers().subscribe({
    next :(res)=>{
      this.users = res; 
    },error : (err)=>{console.log(err);
    }
     } ) ; 
}
else{
  this._user.getUserById(id).subscribe({
    next :(res)=>{
      this.users = [res] ; 
    },error : (err)=>{console.log(err);
    }
     } ) ; 
}



}

delete(id:any){
    Swal.fire({
  position:"center" , 
  title: "Do you want to delete this User",
  showDenyButton: true,
  confirmButtonText: "Yes",
}).then((result) => {
  if (result.isConfirmed) {
    console.log('user id to delete is : '+id);
    
  this._user.deleteUser(id).subscribe({
    next:(res)=>{
      console.log("user deleted "+res);
      this.ngOnInit();
    }
  })
}})

}








}
