import { Component, inject, Input } from '@angular/core';
import { PrimaryButtonComponent } from '../primary-button/primary-button.component';
import { CartService } from '../../service/cart.service';

@Component({
  selector: 'app-skin-card',
  imports: [PrimaryButtonComponent],
  templateUrl: './skin-card.component.html',
  styleUrl: './skin-card.component.scss'
})
export class SkinCardComponent {
  @Input() skin: any;
  carService = inject(CartService);
}
