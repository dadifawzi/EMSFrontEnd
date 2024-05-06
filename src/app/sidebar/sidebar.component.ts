import { Component } from '@angular/core';
import {faAdd, faEdit, faHome, faRightFromBracket, faUsers ,faUser, faCalendar} from "@fortawesome/free-solid-svg-icons";
import { UserserviceService } from '../core/service/userservice.service';
import {Router, RouterModule} from "@angular/router";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [FontAwesomeModule,RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {


protected  faHome = faHome;
  protected  faAdd = faAdd;
  protected  faUsers = faUsers;
  protected  faUser = faUser;
protected faCalendar = faCalendar ; 
  protected  faRightFromBracket = faRightFromBracket;


  constructor(private authService: UserserviceService, private router: Router) {
  }
  logout() {
    this.authService.logout();
   // window.location.reload();
   this.router.navigate(['/login']);
  }


}
