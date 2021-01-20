import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesComponent } from './admin/categories/categories.component';
import { SangleProductComponent } from './ecommerce/sangle-product/sangle-product.component';
import { DisplayCategoryComponent } from './display-category/display-category.component';
import { DisplayTagComponent } from './display-tag/display-tag.component';


const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'sangle/product/:idProduct',
    component: SangleProductComponent
  },
  {
    path: 'puy/product/:name',
    component: SangleProductComponent
  },
  {
    path: 'dsiplay-category/:idCategory',
    component: DisplayCategoryComponent
  },
  {
    path: 'display-tag/:idTag',
    component: DisplayTagComponent
  },
  {
    path: 'profile/:id',
    component: ProfileComponent,
    children: [
      {
        path: 'categories/:idCategory',
        component: CategoriesComponent
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
