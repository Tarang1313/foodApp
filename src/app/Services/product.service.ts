import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../Models/product.model';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
private url = "assets/data.json"
  constructor(private http:HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url);
  }

  getProductById(id: number): Observable<Product | undefined> {
    return this.http.get<Product[]>(this.url).pipe(
      map((products: any) => {
        console.log('API Response:', products); // Debugging
        if (!Array.isArray(products)) {
          console.error('Error: Expected an array but got:', products);
          return undefined;
        }
        return products.find(product => product.id === id);
      })
    );
  }


}
