import { Injectable } from '@angular/core';
import { Product } from '../Models/product.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartDetailsService {

  private cart: Product[] = [];
  private cartSubject = new BehaviorSubject<Product[]>([]);

  cart$ = this.cartSubject.asObservable();

  constructor() {}

  getCart(): Product[] {
    return this.cart;
  }

  addToCart(product: Product) {
    const existingProduct = this.cart.find(item => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += product.quantity;
    } else {
      this.cart.push(product);
    }
    this.cartSubject.next([...this.cart]);
  }

  updateCart(cartItems: Product[]) {
    this.cart = cartItems;
    this.cartSubject.next([...this.cart]);
  }

  removeFromCart(index: number) {
    if (index > -1 && index < this.cart.length) {
      this.cart.splice(index, 1);
    this.cartSubject.next([...this.cart]);

    }
  }

  clearCart() {
    this.cart = [];
    this.cartSubject.next([]);
  }

  updateQuantity(productId: number, quantity: number) {
    const item = this.cart.find((cartItem) => cartItem.id === productId);
    if (item) {
      item.quantity = quantity;
      this.cartSubject.next([...this.cart]);
    }
  }
}
