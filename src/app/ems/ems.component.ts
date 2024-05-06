import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';


@Component({
  selector: 'app-ems',
  standalone: true,
  imports: [RouterOutlet,SidebarComponent],
  templateUrl: './ems.component.html',
  styleUrl: './ems.component.css'
})
export class EmsComponent {

}
