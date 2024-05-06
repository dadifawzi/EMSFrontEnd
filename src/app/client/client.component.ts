import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
@Component({
  selector: 'app-client',
  standalone: true,
  imports: [RouterOutlet,SidebarComponent],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent {

}
