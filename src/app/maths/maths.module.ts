import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumbersComponent } from './numbers/numbers.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [NumbersComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {path: 'numbers', component: NumbersComponent},
      {path: '', pathMatch:'full', redirectTo: 'numbers'}
    ])
  ]
})
export class MathsModule { }
