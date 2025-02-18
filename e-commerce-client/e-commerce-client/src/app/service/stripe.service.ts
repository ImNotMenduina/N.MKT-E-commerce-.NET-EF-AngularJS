import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {loadStripe, Stripe} from '@stripe/stripe-js';
import { CheckoutItem } from '../models/checkoutItem.models';
import { Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StripeService {
  private stripe: Stripe | null = null;

  constructor(private http: HttpClient) {
    this.initStripe();
  }

  // Initializes Stripe with the publishable key 
  private async initStripe() {
    this.stripe = await loadStripe("pk_test_51QtrVHPB764ig9raeobivmzWBEcwJvpkKc2QWYYscT2qNtK9gIqMRmBms5XnLeWzqkZOZWJ6VuLkWnNk3psTpn4o00GcnXkt5q");    ;
  }

  // Creates a checkout session and redirects the user to Stripe checkout
  createCheckoutSession(items: CheckoutItem[]): Observable<void> {
    return this.http.post<{ sessionId: string; }>(
      'https://localhost:7247/api/Sripe/Checkout',
      items
    ).pipe(
      switchMap(async response => {
        const stripe = await this.stripe;
        if (!stripe) {
          throw new Error('Stripe failed to initialize');
        }

        const { error } = await stripe.redirectToCheckout({
          sessionId: response.sessionId // Redirect to Stripe checkout using sessionId from server
        });

        if (error) {
          throw new Error(error.message);
        }
      })
    );
  }
}