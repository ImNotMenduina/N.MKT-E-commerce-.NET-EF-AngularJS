import { Component, Input } from '@angular/core';
import { Weapon } from '../../../models/weapon.models';
import { PrimaryButtonComponent } from "../../primary-button/primary-button.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card',
  imports: [PrimaryButtonComponent, RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() weapon: any;
}
