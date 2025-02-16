import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Weapon } from '../models/weapon.models';
import { HttpClient } from '@angular/common/http';
import { Skin } from '../models/skin.models';

@Injectable({
  providedIn: 'root'
})
export class WeaponService {

  constructor(private http: HttpClient) { }

  getWeapons(): Observable<Weapon[]> {
    let url = "https://localhost:7247/api/Weapons";
    return this.http.get<Weapon[]>(url);
  }

  getWeaponSkins(id: number): Observable<Skin[]> {
    let url = `https://localhost:7247/api/Weapons/${id}`;
    return this.http.get<Skin[]>(url);
  }
}
