import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Home } from './features/home/home';
import { Login } from './features/auth/login';
import { Signup } from './features/auth/signup';
import { ListingCreate } from './features/listing-create/listing-create';
import { ListingPreview } from './features/preview/listing-preview';
import { ListingDetail } from './features/listing-detail/listing-detail';
import { AuthGuard } from './core/guards/auth.guard';


export const routes: Routes = [
  { path: '', component: Home },
  { path: 'login', component: Login },
  { path: 'signup', component: Signup },
  { path: 'create', component: ListingCreate, canActivate: [AuthGuard] },
  { path: 'preview/:id', component: ListingPreview, canActivate: [AuthGuard] },
  { path: 'details/:id', component: ListingPreview, canActivate: [AuthGuard]  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}