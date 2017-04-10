import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent} from './not-found/not-found.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { AuthGuard } from './auth.service';

const routes: Routes = [
  //canActivate: [AuthGuard]
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home',  component: HomeComponent, canActivate: [AuthGuard] },
  { path: '404',  component: NotFoundComponent },
  { path: '401',  component: AccessDeniedComponent },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
