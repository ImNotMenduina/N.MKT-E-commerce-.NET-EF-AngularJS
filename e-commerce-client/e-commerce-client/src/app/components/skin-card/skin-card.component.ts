import { Component, Input } from '@angular/core';
import { PrimaryButtonComponent } from '../primary-button/primary-button.component';

@Component({
  selector: 'app-skin-card',
  imports: [PrimaryButtonComponent],
  templateUrl: './skin-card.component.html',
  styleUrl: './skin-card.component.scss'
})
export class SkinCardComponent {
  @Input() skin: any;
  ngOnInit() {
    console.log(this.skin.displayName);
  }
}
