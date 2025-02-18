import { Routes } from '@angular/router';
import { ProductsListComponent } from './components/page/products-list/products-list.component';
import { SkinsListComponent } from './components/page/skins-list/skins-list.component';
import { CartComponent } from './components/cart/cart.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch:'full',
        component: ProductsListComponent
    },
    {
        path: 'weapon/:id',
        component: SkinsListComponent
    }, 
    {
        path: 'cart',
        component: CartComponent
    }
];
