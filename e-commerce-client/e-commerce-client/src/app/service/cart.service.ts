import { Injectable, signal } from '@angular/core';
import { Skin } from '../models/skin.models';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart = signal<Skin[]>([]);
  
  addItem(item: Skin) {
    this.cart.set([...this.cart(), item])
  }

  getItems() {
    return this.cart();
  }

  removeItem(skin: Skin) {
    let newCart: Skin[] = []
    this.cart().forEach(s => {
      if (s.skinId != skin.skinId) {
        newCart.push(s);
      }  
    });
    this.cart.set(newCart);
  }

  constructor() { }
}
