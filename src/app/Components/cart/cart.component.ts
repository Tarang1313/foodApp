import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/Models/product.model';
import { CartDetailsService } from 'src/app/Services/cart-details.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems: any[] = [];
  subtotal: number = 0;
  discount: number = 56;
  total: number = 0;
  header = "Cart"

  constructor(private cartService: CartDetailsService) {}

  ngOnInit(): void {
    this.getCartItems();
  }

  getCartItems() {
    this.cartItems = this.cartService.getCart();
    this.calculateTotals();
  }

  increaseQuantity(index: number) {
    this.cartItems[index].quantity++;
    this.calculateTotals();
  }

  decreaseQuantity(index: number) {
    if (this.cartItems[index].quantity > 1) {
      this.cartItems[index].quantity--;
      this.calculateTotals();
    }
  }

  removeFromCart(index: number) {
    console.log(index)
    this.cartService.removeFromCart(index);
    this.getCartItems();
  }

  calculateTotals() {
    this.subtotal = this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    this.total = this.subtotal - this.discount;
  }

  buyNow() {
    if (this.cartItems.length === 0) {
      alert("Cart is empty!");
      return;
    }

    const totalQuantity = this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const discount = this.discount;
    const total = subtotal - discount;

    const orderDetails = {
      products: this.cartItems.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        totalPrice: item.price * item.quantity,
      })),
      totalQuantity: totalQuantity,
      subtotal: subtotal,
      discount: discount,
      total: total
    };

    console.log("Order Details:", orderDetails);
    alert("Order placed successfully! Check console for details.");
  }


}

