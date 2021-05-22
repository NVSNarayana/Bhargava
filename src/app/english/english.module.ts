import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CarouselModule} from 'primeng/carousel';
import {ToastModule} from 'primeng/toast';
import {ButtonModule} from 'primeng/button';
import { AlphabetsComponent } from './alphabets/alphabets.component';
import { RouterModule } from '@angular/router';
import { WordsComponent } from './words/words.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WordsWithImgComponent } from './words-with-img/words-with-img.component';



@NgModule({
  declarations: [AlphabetsComponent, WordsComponent, WordsWithImgComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CarouselModule,
    ToastModule,
    ButtonModule,
    RouterModule.forChild([
      {path: 'alphabets', component: AlphabetsComponent},
      {path: 'words', component: WordsComponent},
      {path: 'wordswithimg', component: WordsWithImgComponent},
      {path: '', pathMatch:'full', redirectTo: 'alphabets'}
    ])
  ]
})
export class EnglishModule { }
