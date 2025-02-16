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

  constructor() { }
}
