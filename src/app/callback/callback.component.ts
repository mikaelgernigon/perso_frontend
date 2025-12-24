import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';



@Component({
  selector: 'app-callback',
  standalone: true,
  imports: [],
  templateUrl: './callback.component.html',
  styleUrl: './callback.component.css'
})
export class CallbackComponent implements OnInit {
  

  constructor(
    private userService: UserService         
  ) {}

  ngOnInit(): void {
    this.userService.setAccessToken();
  }

}