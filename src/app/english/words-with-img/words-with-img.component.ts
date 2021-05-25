import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { Carousel } from 'primeng/carousel';

import { EnglishWord, EnglishWordWithImg } from 'src/app/core/models/english-word';
import { VoiceText, VoiceTextFrom } from 'src/app/core/models/voice-text';
import { EnglishService } from 'src/app/core/services/english/english.service';
import { TextSpeakService } from 'src/app/core/services/text-speak.service';

@Component({
  selector: 'app-words-with-img',
  templateUrl: './words-with-img.component.html',
  styleUrls: ['./words-with-img.component.scss']
})
export class WordsWithImgComponent implements OnInit {

  private subscriptions: Array<Subscription> = [];
  private words: Array<EnglishWord> = [];
  private currentNo = 0;
  currentPage = 0;
  startFrom = 'A';
  currentItem: EnglishWord;
  items: Array<EnglishWordWithImg> = [];
  @ViewChild('slider', { read: Carousel }) slider: Carousel;
  autoplayInterval = 0;
  autoPlay = false;
  shouldSpeak = false;

  constructor(private textSpeakSvc: TextSpeakService,
    private englishSvc: EnglishService) {

  }

  ngOnInit(): void {
    this.updateStartFrom(undefined);

    this.subscribeEvents();
  }

  ngOnDestroy(): void {
    this.unsubscribeEvents();
  }

  updateAutoPlay(e: { checked: boolean, originalEvent: MouseEvent }): void {
    this.autoPlay = e.checked;
    this.items = undefined;
    this.autoplayInterval = e.checked ? 3000 : 0;
    timer(2000).subscribe(t => {
      this.items = this.getItems();
    });
  }

  updateShouldSpeak(e: { checked: boolean, originalEvent: MouseEvent }): void {
    this.shouldSpeak = e.checked;
  }
  

  pageChanged(e: Event) {
    console.log(e);
    this.handleShouldSpeak(e as any);
  }

  updateStartFrom(e: Event): void {
    const index = this.items.findIndex(v => v.alphabet.includes(this.startFrom));
    if (index >= 0) {
      this.currentPage = index;
    }
  }

  subscribeEvents(): void {
    this.englishSvc.getWords().subscribe(v => {
      if (v && v.data) {
        this.words = v.data;
        this.items = this.getItems();
      }
    });
    this.subscriptions.push(this.textSpeakSvc.speakDoneObservable().subscribe((v: VoiceText) => {
      console.log('form english words obs: ', v);
      if (!v || v.from !== VoiceTextFrom.EnglishWordsWithImg) { return; }
      // this.start(null);
    }));
  }

  unsubscribeEvents(): void {
    this.subscriptions.forEach(v => {
      v.unsubscribe();
    })
  }

  private setCurrentItem(): void {
    this.currentItem = this.words[this.currentNo++];
  }

  private handleShouldSpeak(e: { page: number }): void {
    if(!this.shouldSpeak){ return;}
    if (!e || !this.items || this.items.length === 0) { return }
    const item = this.items[e.page];
    this.textSpeakSvc.startSpeak(item.text, VoiceTextFrom.EnglishWordsWithImg);
  }

  private getCurrentSpeachText(): string {
    this.setCurrentItem();
    let voiceText = `${this.currentItem.alphabet}`;
    this.currentItem.items.forEach(item => {
      voiceText = `${voiceText}, ${item}`;
    });
    return voiceText;
  }

  private getItems(): Array<EnglishWordWithImg> {
    if (!this.words || this.words.length === 0) { return []; }
    const arrWordsWithImgs = this.words.map(v => {
      const arr = [];
      v.items.forEach(i => {
        arr.push(new EnglishWordWithImg({ alphabet: `${v.alphabet} ${v.alphabet.toLocaleLowerCase()}`, text: i.text.toLocaleLowerCase(), img: `assets/english/imgs/${i.img}` }));
      });
      return arr;
    });
    return [].concat.apply([], arrWordsWithImgs);
  }
}
