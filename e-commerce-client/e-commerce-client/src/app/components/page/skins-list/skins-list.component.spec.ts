import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkinsListComponent } from './skins-list.component';

describe('SkinsListComponent', () => {
  let component: SkinsListComponent;
  let fixture: ComponentFixture<SkinsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkinsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkinsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
