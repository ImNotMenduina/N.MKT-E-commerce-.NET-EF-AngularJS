import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Weapon } from '../models/weapon.models';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeaponService {

  constructor(private http: HttpClient) { }

  getWeapons(): Observable<Weapon[]> {
    let url = "https://localhost:7247/api/Weapons"
    return this.http.get<Weapon[]>(url);
  }
}
