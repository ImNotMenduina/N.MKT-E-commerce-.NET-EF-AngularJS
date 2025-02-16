import { HttpClient } from '@angular/common/http';
import { Component, Input, signal } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { Weapon } from '../../../models/weapon.models';
import { WeaponService } from '../../../service/weapon.service';

@Component({
  selector: 'app-products-list',
  imports: [CardComponent],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss'
})
export class ProductsListComponent {
  constructor(private http: HttpClient, private weaponService: WeaponService) { }

  classAdd = Input('');
  weapons = signal<Weapon[]>([])

  ngOnInit() {
    this.loadWeapons();
  }

  loadWeapons() {
    this.weaponService.getWeapons().subscribe(
      {
        next: (weapons) => this.weapons.set(weapons),
        error: (error) => console.error('Error:', error)
      }
    )
  }
}
