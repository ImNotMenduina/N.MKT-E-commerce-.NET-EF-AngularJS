import { Component, inject, signal } from '@angular/core';
import { CartService } from '../../service/cart.service';
import { Skin } from '../../models/skin.models';
import { PrimaryButtonComponent } from "../primary-button/primary-button.component";
import { StripeService } from '../../service/stripe.service';
import { CheckoutItem } from '../../models/checkoutItem.models';

@Component({
  selector: 'app-cart',
  imports: [PrimaryButtonComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  cartService = inject(CartService);
  stripeService = inject(StripeService);
  items = []
  

  async payNow(): Promise<void> {
    if (this.cartService.cart().length === 0) {
      alert('Your cart is empty!');
      return;
    }
    const lineItems = this.createLineItems();
    this.stripeService.createCheckoutSession(lineItems).subscribe({
      next: () => {
        // Redirect is handled by the service
        console.log('Checkout initiated');
      },
      error: (error) => {
        console.error('Checkout failed:', error);
        alert('Failed to initiate checkout. Please try again.');
      }
    });
  }

  // Create line items from cart products
  private createLineItems(): any[] {
    return this.cartService.cart()
      .map(product => ({
        name: product.displayName,
        price: 2400,
        quantity: 1
      }));
  }
}
