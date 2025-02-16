import { HttpClient } from '@angular/common/http';
import { Component, Input, signal } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { Weapon } from '../../../models/weapon.models';

@Component({
  selector: 'app-products-list',
  imports: [CardComponent],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss'
})
export class ProductsListComponent {
  constructor(private http: HttpClient) {
    this.http = http;
  }
  classAdd = Input('');
  weapons = signal<Weapon[]>([])

  ngOnInit() {
    this.loadWeapons();
  }

  loadWeapons() {
    let url = "https://localhost:7247/api/Weapons"
    this.http.get<Weapon[]>(url).subscribe(
      (data) => {
        this.weapons.set(data)
      },
      (error) => {
        console.error('Error fetching posts:', error);
      }
    );
  }
}
