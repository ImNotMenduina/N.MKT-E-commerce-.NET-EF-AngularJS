import { Component, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeaponService } from '../../service/weapon.service';
import { Skin } from '../../models/skin.models';
import { SkinCardComponent } from "../skin-card/skin-card.component";

@Component({
  selector: 'app-skins-list',
  imports: [SkinCardComponent],
  templateUrl: './skins-list.component.html',
  styleUrl: './skins-list.component.scss'
})
export class SkinsListComponent {
  constructor(private route: ActivatedRoute, private weaponService: WeaponService) {} // Injeta ActivatedRoute

  skins = signal<Set<Skin>>(new Set())
  
  weaponId: number | null = null
  ngOnInit() {
    this.weaponId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.weaponId != null)
    {
      this.loadSkins(this.weaponId);
    }
  }

  loadSkins(id: number) {
    this.weaponService.getWeaponSkins(id).subscribe({
      next: (skins) => {this.skins.set(skins); console.log(skins)},
      error: (error) => console.error('Error:', error),
    })
  }
}
