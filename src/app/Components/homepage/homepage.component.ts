import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../Services/product.service';
import { CartDetailsService } from '../../Services/cart-details.service';
import { Product } from 'src/app/Models/product.model';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  products: Product[] = [];
  quantity: number = 1;
  filteredProducts: any[] = [];
  searchTerm: string = '';
  header = "Burger Queen"

  constructor(private productService: ProductService, private cartDetailsService: CartDetailsService) {

  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
      this.filteredProducts = this.products
    });
  }


  addToCart(product:Product) {
    if (this.products) {
      this.cartDetailsService.addToCart({ ...product, quantity: this.quantity });
      alert('Product added to cart!');
    }
  }

  searchProducts() {
    if (this.searchTerm.trim()) {
      this.filteredProducts = this.products.filter(product =>
        product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredProducts = this.products;
    }
  }


}
