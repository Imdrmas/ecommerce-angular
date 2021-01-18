import { AddTagComponent } from './../admin/add-tag/add-tag.component';
import { CategoryService } from './../service/category.service';
import { Category } from './../modal/Modal';

import { MatDialog } from '@angular/material/dialog';
import { UserService } from './../service/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../modal/Modal';
import { ActivatedRoute } from '@angular/router';
import { AddCategoryComponent } from '../admin/add-category/add-category.component';
import { AddProductComponent } from '../admin/add-product/add-product.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User = {} as User;
  categories: Category[];

  constructor(private userService: UserService, private route: ActivatedRoute, private dialog: MatDialog,
    private categoryService: CategoryService) {
    this.route.params.subscribe(
      params => {
        this.userService.findByUsername(this.userService.getUsername()).subscribe(user => {
          this.user = user;
          this.categoryService.findAllCategories().subscribe(categories => {
            this.categories = categories;
          })
        })
      }
    )
   }

  ngOnInit(): void {
  }
  
  logout(id: number) {
    this.userService.deleteUser(id).subscribe(() => {
      window.location.replace("/dashboard");
      this.userService.signOut();
    })
  }
 addCategory(idUser: number) {
  this.dialog.open(AddCategoryComponent, {
    data: {idUser}
  })
 }
 
 addProduct(idCategory) {
  this.dialog.open(AddProductComponent, {
    data: {idCategory}
  })
 }

 addTag() {
  this.dialog.open(AddTagComponent);
}
}
