import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateUsersComponent } from './create-users/create-users.component';
import { HomeComponent } from './home/home.component';
import { UpdateUsersComponent } from './update-users/update-users.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'createUsers', component: CreateUsersComponent},
  {path: 'updateUsers', component: UpdateUsersComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
