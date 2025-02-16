import { Component, inject, input, output } from '@angular/core';
import { CartService } from '../../service/cart.service';

@Component({
  selector: 'app-primary-button',
  imports: [],
  templateUrl: './primary-button.component.html',
  styleUrl: './primary-button.component.scss'
})
export class PrimaryButtonComponent {
  label = input("");
  class = input("");
  btnClicked = output();
}
