import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginComponent } from 'src/app/login/login.component';
import { ProductOrder, Product, ProductOrders, UpdateProduct, Tag, User, Comment, Cart } from 'src/app/modal/Modal';
import { CartService } from 'src/app/service/cart.service';
import { CommentService } from 'src/app/service/comment.service';
import { OrderService } from 'src/app/service/order.service';
import { ProductService } from 'src/app/service/product.service';
import { TagService } from 'src/app/service/tag.service';
import { UserService } from 'src/app/service/user.service';
import { OrdersComponent } from '../orders/orders.component';
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';

@Component({
  selector: 'app-sangle-product',
  templateUrl: './sangle-product.component.html',
  styleUrls: ['./sangle-product.component.scss']
})
export class SangleProductComponent implements OnInit {
  name: string;
  user: User = {} as User;
  productOrders: ProductOrder[] = [];
  products: Product[] = [];
  tags: Tag[] = [];
  comment: Comment = {} as Comment;
  comments: Comment[];
  cartExist: Cart = {} as Cart;
  cart: Cart = {} as Cart;
  selectedProductOrder: ProductOrder;
  shoppingCartOrders: ProductOrders;
  sub: Subscription;
  productSelected: boolean = false;
  collapsed = true;
  orderFinished = false;
  showBtn = -1;
  submitted = false;

  @ViewChild('shoppingCartC')
  shoppingCartC: ShoppingCartComponent;

  @ViewChild('ordersC')
  ordersC: OrdersComponent;

  description: string = '';
  showMyContainerInfo: boolean = false;

  idProduct: number;
  product: UpdateProduct;

  counter: number = 1;
  @Input() url = location.href;

  constructor(private productService: ProductService, private tagService: TagService,
    private orderService: OrderService, private route: ActivatedRoute, private userService: UserService,
    private commentService: CommentService, private dialog: MatDialog,
    private cartService: CartService) {

  }

  ngOnInit() {
    this.loadOrders();
    this.sangleProduct();
    this.userService.findByUsername(this.userService.getUsername()).subscribe(user => {
      this.user = user;
    })
  }

  addToCart(order: ProductOrder, idUser) {
    this.orderService.SelectedProductOrder = order;
    this.selectedProductOrder = this.orderService.SelectedProductOrder;
    this.productSelected = true;
    this.cart.name = order.product.name;
    this.cart.price = order.product.price;
    this.cart.quantity = order.quantity;
    this.cart.pictureUrl = order.product.pictureUrl;
    this.cartService.addCartToUser(this.cart, idUser).subscribe(cart => {
      this.cart = cart;
      this.cartService.saveCartName(this.cart.name);
    })
  }

  removeFromCart(productOrder: ProductOrder, idUser) {
    let index = this.getProductIndex(productOrder.product);
    if (index > -1) {
      this.shoppingCartOrders.productOrders.splice(
        this.getProductIndex(productOrder.product), 1);
      const name = this.cartService.getCartName();
      this.cartService.findCartsForUser(idUser).subscribe(carts => {
        this.cartExist = carts.filter(item => item.name === name)[0];
        this.cartService.removeFromCart(this.cartExist.id, idUser).subscribe(() => {
        })
      })
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

  loadOrders() {
    this.sub = this.orderService.OrdersChanged.subscribe(() => {
      this.shoppingCartOrders = this.orderService.ProductOrders;
    });
  }

  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }

  finishOrder(orderFinished: boolean) {
    this.orderFinished = orderFinished;
  }

  reset() {
    this.productOrders = [];
    this.orderService.ProductOrders.productOrders = [];
    this.loadOrders();
    this.productSelected = false;
    this.orderFinished = false;
    this.shoppingCartC.reset();
    this.ordersC.paid = false;
  }

  private sangleProduct() {
    this.product = new UpdateProduct();
    this.idProduct = this.route.snapshot.params.idProduct;
    this.tagService.findTagsForProduct(this.idProduct).subscribe(tags => {
      this.tags = tags;
    });
    this.commentService.findCommentsForProduct(this.idProduct).subscribe(comments => {
      this.comments = comments;
    });
    this.productService.findProductById(this.idProduct).subscribe(data => {
      this.name = data.name;
      this.productService.findByName(this.name).subscribe((products: any[]) => {
        this.products = products;
        this.products.forEach(product => {
          this.productOrders.push(new ProductOrder(product, 0));
        });
      });
      this.submitted = true;
    });
  }
  addComment(idProduct, username) {
    this.comment.addedBy = username;
    this.commentService.addCommentToProduct(this.comment, idProduct).subscribe(comment => {
      this.comment = comment;
      window.location.reload();
    })
  }
  login() {
    this.dialog.open(LoginComponent);
  }
}
