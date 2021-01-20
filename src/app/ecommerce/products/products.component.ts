import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginComponent } from 'src/app/login/login.component';
import { ProductOrder, Product, ProductOrders, User} from 'src/app/modal/Modal';
import { OrderService } from 'src/app/service/order.service';
import { ProductService } from 'src/app/service/product.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  user: User = new User();
  productOrders: ProductOrder[] = [];
  products: Product[] = [];
  selectedProductOrder: ProductOrder;
  shoppingCartOrders: ProductOrders;
  sub: Subscription;
  productSelected = false;
  description: string = '';
  showMyContainerInfo = false;
  showBtn = -1;
  idCart: number;

  constructor(private orderService: OrderService, private router: Router, private dialog: MatDialog,
    private productService: ProductService, private userService: UserService) {
      this.userService.findByUsername(this.userService.getUsername()).subscribe(user => {
        this.user = user;
      });
  }

  ngOnInit() {
    this.productOrders = [];
    this.loadProducts();
    this.loadOrders();

  }

  addToCart(order: ProductOrder, idUser) {
    this.orderService.SelectedProductOrder = order;
    this.selectedProductOrder = this.orderService.SelectedProductOrder;
    this.productSelected = true;
  }

  removeFromCart(productOrder: ProductOrder, idUser) {
    let index = this.getProductIndex(productOrder.product);
    if (index > -1) {
      this.shoppingCartOrders.productOrders.splice(
        this.getProductIndex(productOrder.product), 1);
    }
    this.orderService.ProductOrders = this.shoppingCartOrders;
    this.shoppingCartOrders = this.orderService.ProductOrders;
    this.productSelected = false;
  }

  getProductIndex(product: Product): number {
    return this.orderService.ProductOrders.productOrders.findIndex(
      value => value.product === product);
  }

  isProductSelected(product: Product): boolean {
    return this.getProductIndex(product) > -1;
  }

  loadProducts() {
    this.productService.findAllProducts().subscribe(
      (products: any[]) => {
        this.products = products;
        this.products.forEach(product => {
          this.productOrders.push(new ProductOrder(product, 0));
        })
      }
    );
  }

  loadOrders() {
    this.sub = this.orderService.OrdersChanged.subscribe(() => {
      this.shoppingCartOrders = this.orderService.ProductOrders;
    });
  }

  reset() {
    this.productOrders = [];
    this.loadProducts();
    this.orderService.ProductOrders.productOrders = [];
    this.loadOrders();
    this.productSelected = false;
  }
  productInfo(id: number) {
    this.productService.findProductById(id).subscribe(data => {
      this.description = data.description;
      console.log(this.description);
    });
    this.showMyContainerInfo = !this.showMyContainerInfo;
  }

  showUndoBtn(index) {
    this.showBtn = index;
  }
  sngleProduct(id: number) {
    this.router.navigate(['sangle/product', id]);
  }
  login() {
    this.dialog.open(LoginComponent);
  }
}
