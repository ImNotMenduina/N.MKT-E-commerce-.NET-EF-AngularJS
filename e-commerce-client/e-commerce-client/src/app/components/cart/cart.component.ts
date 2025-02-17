import { Component, inject, signal } from '@angular/core';
import { CartService } from '../../service/cart.service';
import { Skin } from '../../models/skin.models';
import { PrimaryButtonComponent } from "../primary-button/primary-button.component";

@Component({
  selector: 'app-cart',
  imports: [PrimaryButtonComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  cartService = inject(CartService);
}
