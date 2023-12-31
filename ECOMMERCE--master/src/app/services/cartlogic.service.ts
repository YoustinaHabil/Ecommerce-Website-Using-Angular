import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Productinterface } from '../interface/productinterface';

@Injectable({
  providedIn: 'root',
})
export class CartlogicService {
  isinside!: {};
  cartitemlist: any[] = [];
  productsMenu = new BehaviorSubject<any>([]);

  constructor() {}
  getProduct() {
    return this.productsMenu.asObservable();
  }
  setProduct(product: any) {
    this.cartitemlist.push(product);
    this.productsMenu.next(this.cartitemlist);
  }
  addtoCart(product: any) {
    this.isinside = this.cartitemlist.find((po: any) => po.id === product.id);
    if (!this.isinside) {
      this.cartitemlist.push(product);
      this.productsMenu.next(this.cartitemlist);
      this.gettoPrice();
    }
  }
  isinsidecart() {
    return this.productsMenu.asObservable();
  }

  gettoPrice(): number {
    let fulltotal = 0;
    this.cartitemlist.map((cart: any) => {
      fulltotal += cart.total;
    });
    return fulltotal;
  }
  removeallcart() {
    this.cartitemlist = [];
    this.productsMenu.next(this.cartitemlist);
  }
  removeitem(product: any) {
    let id = product.id;
    this.cartitemlist.splice(id, 1);
    this.productsMenu.next(this.cartitemlist);
  }
}
