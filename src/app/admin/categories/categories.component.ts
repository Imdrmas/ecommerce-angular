import { AddTagToProductComponent } from './../add-tag-to-product/add-tag-to-product.component';
import { AddProductComponent } from './../add-product/add-product.component';
import { AddCategoryComponent } from './../add-category/add-category.component';
import { UserService } from './../../service/user.service';
import { MatDialog } from '@angular/material/dialog';
import { CategoryService } from './../../service/category.service';
import { ProductService } from './../../service/product.service';
import { Product, Category, User, Tag, Comment } from './../../modal/Modal';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TagService } from 'src/app/service/tag.service';
import { CommentService } from 'src/app/service/comment.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  idCategory: number;
  products: Product[];
  category: Category = {} as Category;
  user: User = {} as User;
  panelOpenState: boolean;
  tags: Tag[];
  comments: Comment[];

  constructor(private productService: ProductService, private categoryService: CategoryService,
    private route: ActivatedRoute, private dialog: MatDialog, private userService: UserService,
    private tagService: TagService, private commentService: CommentService) {
    this.route.params.subscribe(
      params => {
        this.idCategory = this.route.snapshot.params.idCategory;
        this.categoryService.findCategoryById(this.idCategory).subscribe(category => {
          this.category = category;
          this.productService.findProductsForCategory(this.idCategory).subscribe(products => {
            this.products = products;
          });
        })
        this.userService.findByUsername(this.userService.getUsername()).subscribe(user => {
          this.user = user;
        })
        this.commentService.findAllComments().subscribe(comments => {
          this.comments = comments;
        })
      }
    )
  }

  ngOnInit(): void {
  }

  addTag(idProduct) {
    this.dialog.open(AddTagToProductComponent, {
      data: { idProduct }
    })
  }
  showTags(idProduct) {
    this.tagService.findTagsForProduct(idProduct).subscribe(tags => {
      this.tags = tags;
    })
  }
  deleteCategory(idCategory, idUser) {
    if (confirm("Are you sure")) {
      this.categoryService.deleteCategory(idCategory).subscribe(() => {
        window.location.replace(`/profile/${idUser}`)
      })
    }
  }
  editCategory(idCategory) {
    this.dialog.open(AddCategoryComponent, {
      data: { idCategory }
    })
  }
  deleteProduct(idProduct, idUser) {
    if (confirm("Are you sure")) {
      this.productService.deleteProduct(idProduct).subscribe(() => {
        window.location.replace(`/profile/${idUser}`)
      })
    }
  }
  editProduct(idProduct) {
    this.dialog.open(AddProductComponent, {
      data: { idProduct }
    })
  }
  deleteComment(id) {
    this.commentService.deleteComment(id).subscribe(() => {
      window.location.reload();
    })
  }
}
