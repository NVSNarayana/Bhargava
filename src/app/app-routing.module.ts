import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'maths', loadChildren: ()=> import('../app/maths/maths.module').then(v=> v.MathsModule)},
  {path: 'english', loadChildren:()=> import('../app/english/english.module').then(v=> v.EnglishModule)},
  {path: '', pathMatch:'full', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
