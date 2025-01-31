import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/Models/product.model';
import { CartDetailsService } from 'src/app/Services/cart-details.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productId = 1
  product: Product | undefined;
  quantity: number = 1;
  relatedProducts: Product[] | undefined;
  header = "Product Details"
  cartItem: any[] = [];

  constructor(private cartDetailsService: CartDetailsService,private router: Router,private route: ActivatedRoute,private productService:ProductService) {}



  ngOnInit(): void {
    const productId = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProductById(productId).subscribe((product) => {
      if (product) {
        this.product = product;
        this.getCartItems();

          const cartItem = this.cartItem.find(item => item.id === productId);
          if (cartItem) {
            this.quantity = cartItem.quantity;
          }
        this.getRelatedProducts(product.category, product.id);

      }
    });

  }

  addToCart(product:Product) {
    if (this.product) {
      this.cartDetailsService.addToCart({ ...product, quantity: this.quantity });
    }
  }

  getRelatedProducts(category: string, currentProductId: number) {
    this.productService.getProducts().subscribe(products => {
      this.relatedProducts = products
        .filter(p => p.category === category && p.id !== currentProductId)
        .slice(0, 3);
    });
  }

  getCartItems() {
    this.cartItem = this.cartDetailsService.getCart();
  }

  increaseQuantity() {
    this.quantity++;

this.updateQuantity();
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
this.updateQuantity();


    }
  }

  updateQuantity() {
    if (this.product) {
      this.cartDetailsService.updateQuantity(this.product.id, this.quantity);
    }
  }
}
