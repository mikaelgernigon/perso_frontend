import { Component, OnInit } from '@angular/core';
import { MsgListConfig } from '../model/msg-list-config.model';
import { CommonModule } from '@angular/common';
import { UserService } from '../service/user.service';
import { AuthButtonComponent } from '../ui/auth-button/auth-button.component';

@Component({
  selector: 'app-forum',
  imports: [CommonModule, AuthButtonComponent],
  templateUrl: './forum.component.html',
  styleUrl: './forum.component.css'
})
export class ForumComponent implements OnInit {
isAuthenticated: boolean = true;
  listConfig: MsgListConfig = {
    type: 'all',
    filters: {}
  };
  tags: Array<string> = [];
  tagsLoaded = false;

    constructor(
    private userService: UserService
    ) {}

  ngOnInit(): void {
    this.userService.isAuthenticated.subscribe(
      (authenticated) => {
        this.isAuthenticated = authenticated;

        // set the article list accordingly
        if (authenticated) {
          this.setListTo('feed');
        } else {
          this.setListTo('all');
        }
      });
  }

  setListTo(type: string = '', filters: Object = {}) {
    // Otherwise, set the list object
    this.listConfig = {type: type, filters: filters};
  }
}
