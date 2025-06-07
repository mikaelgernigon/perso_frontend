import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthButtonComponent } from "../ui/auth-button/auth-button.component";

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, AuthButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
