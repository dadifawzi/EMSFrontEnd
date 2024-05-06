import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule ,FormGroup , FormBuilder , Validator, Validators,FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { UserserviceService } from '../core/service/userservice.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

 loginForm: FormGroup;

  constructor( private fb: FormBuilder, private _user: UserserviceService, private _router: Router ){

    let controls = {
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    }

    this.loginForm = fb.group(controls);

  }

  login(){

    this._user.signin( this.loginForm.value ).subscribe({
      next: (res: any)=>{
       
        localStorage.setItem('myToken',res.myToken);

        let data = JSON.parse( window.atob( res.myToken.split('.')[1] ) ) ;

        localStorage.setItem('Role',data.role) ; 
        localStorage.setItem('Name',data.fullname) ; 

        localStorage.setItem('ID',data._id) ;

        this._router.navigate(['/ems/dashboard']);

      },
      error: ()=>{
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong! please try again",
        });
        
      }
    })

  }
}
