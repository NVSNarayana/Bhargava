import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EnglishWord } from 'src/app/core/models/english-word';
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
  startFrom = 0;
  currentItem: EnglishWord;
  isStopped = false;

  constructor(private textSpeakSvc: TextSpeakService, private englishSvc: EnglishService) { }

  ngOnInit(): void {
    this.updateCurrentNumber(undefined);
    this.englishSvc.getWords().subscribe(v => {
      if (v && v.data) {
        this.words = v.data;
      }
    });
    this.subscribeEvents();
  }

  ngOnDestroy(): void {
    this.unsubscribeEvents();
  }

  updateCurrentNumber(e: Event): void {
    this.currentNo = this.startFrom;
  }

  start(e: Event): void {
    if (e) { this.isStopped = false; }
    if (this.isStopped) { return; }
    if (!this.words) { return; }
    this.textSpeakSvc.startSpeak(this.getCurrentSpeachText(), VoiceTextFrom.EnglishWordsWithImg);
    if (this.words.length === this.currentNo) { this.currentNo = 0; }
  }

  stop(e: Event): void {
    this.isStopped = true;
  }

  subscribeEvents(): void {
    this.subscriptions.push(this.textSpeakSvc.speakDoneObservable().subscribe((v: VoiceText) => {
      console.log('form english words obs: ', v);
      if (!v || v.from !== VoiceTextFrom.EnglishWordsWithImg) { return; }
      this.start(null);
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

  private getCurrentSpeachText(): string {
    this.setCurrentItem();
    let voiceText = `${this.currentItem.alphabet}`;
    this.currentItem.items.forEach(item => {
      voiceText = `${voiceText}, ${item}`;
    });
    return voiceText;
  }

}
