import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { WishListComponent } from './components/wish-list/wish-list.component';
import { TourDetailsComponent } from './components/tour-details/tour-details.component';
import { WishListGuard } from './services/wish-list.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'wish-list',
    component: WishListComponent,
    canActivate: [WishListGuard]
  },
  {
    path: 'tour/:id',
    component: TourDetailsComponent
  },
  {
    path: '**',
    component: HomeComponent
  },
  {
     path: '', redirectTo: '/', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true,
    scrollPositionRestoration: 'enabled'
  })],
  providers: [WishListGuard],
  exports: [RouterModule]
})

export class AppRoutingModule { }
