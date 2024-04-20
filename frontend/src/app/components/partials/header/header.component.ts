import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  cartQuantity = 0;
  user!: User;
  returnUrl: string = '';

  constructor(
    cartService: CartService,
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    cartService
      .getCartObservable()
      .subscribe((newCart) => (this.cartQuantity = newCart.totalCount));

    userService.userObservable.subscribe((newUser) => {
      this.user = newUser;
    });

    this.activatedRoute.queryParams.subscribe(params => {
      this.returnUrl = params['returnUrl'];
    });
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/']);
  }

  // get isAuth(){
  //   console.log(this.user.token);
  //   return this.user.token;
  // }
  get isAuth() {
    return this.user.token;
  }
}
