import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, FormBuilder, Validators, FormsModule } from '@angular/forms';
import Swal from 'sweetalert2' ;
import { Router,ActivatedRoute } from '@angular/router';
import { UserserviceService } from '../../core/service/userservice.service';
@Component({
  selector: 'app-updateuser',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule],
  templateUrl: './updateuser.component.html',
  styleUrl: './updateuser.component.css'
})
export class UpdateuserComponent implements OnInit {


userForm: FormGroup;
  image: any;
id: any ; 
  constructor( private route :ActivatedRoute ,  private fb: FormBuilder, private _client: UserserviceService, private _router: Router ){

    let controls = {
      fullname: new FormControl('', [ Validators.required ]),
      email: new FormControl('', [ Validators.required ]),
      tel: new FormControl('', [ Validators.required ]),
      role : new FormControl('',[Validators.required]),
      tag : new FormControl('',[Validators.required]),
      password:  new FormControl('',[])



    }

    this.userForm = fb.group(controls);
  }
  ngOnInit(): void {
  this.id = this.route.snapshot.paramMap.get('id');
  this.getUserById(this.id) ;
  }


   selectImage(e: any){
    console.log("image selected ");
    
    this.image = e.target.files[0];
  }

  create(){
console.log("add new client "+this.userForm);

    let fd = new FormData();
    fd.append('fullname', this.userForm.value.fullname);
    fd.append('email', this.userForm.value.email);
    fd.append('tel', this.userForm.value.tel);
    fd.append('tag',this.userForm.value.tag);
   
    fd.append('role',this.userForm.value.role);
       if(this.image){
      fd.append('image', this.image);
    };
    if(this.userForm.value.password != null){
    if(this.userForm.value.password.length > 0){
      fd.append('password', this.userForm.value.password);
    };
  };
    this._client.updateUser(this.id,fd).subscribe({
      next: (res)=>{
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your Client has been saved",
          showConfirmButton: false,
          timer: 2500
        });
//add wait function for 2s 
setTimeout(() => {
  this._router.navigate(['/ems/user/list']);
}, 1000);
      },error :( err )=>{
         Swal.fire({
          position: "center",
          icon: "warning",
          title: "Erro check inputs",
          showConfirmButton: false,
          timer: 5000
        });
      }

    })

  }


getUserById(id:any){
  this._client.getUserById(id).subscribe({
    next :(res)=>{
      this.userForm.reset(res); 
    }
  })
}


}
