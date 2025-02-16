import { Component, Input } from '@angular/core';
import { Weapon } from '../../../models/weapon.models';
import { PrimaryButtonComponent } from "../../primary-button/primary-button.component";

@Component({
  selector: 'app-card',
  imports: [PrimaryButtonComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() weapon: any;
}
