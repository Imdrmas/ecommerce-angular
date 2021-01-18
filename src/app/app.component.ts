import { LoginComponent } from './login/login.component';
import {MatDialog} from '@angular/material/dialog';
import { Component } from '@angular/core';
import { UserService } from './service/user.service';
import { User } from './modal/Modal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user: User = {} as User;
  constructor(public dialog: MatDialog, private userService: UserService){
    this.userService.findByUsername(userService.getUsername()).subscribe(user => {
     this.user = user;
    })
  }


  login() {
    this.dialog.open(LoginComponent);
  }
}
