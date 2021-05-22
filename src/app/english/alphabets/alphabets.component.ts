import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { VoiceText, VoiceTextFrom } from 'src/app/core/models/voice-text';
import { TextSpeakService } from 'src/app/core/services/text-speak.service';

@Component({
  selector: 'app-alphabets',
  templateUrl: './alphabets.component.html',
  styleUrls: ['./alphabets.component.scss']
})
export class AlphabetsComponent implements OnInit {
  private subscriptions: Array<Subscription> = [];
  private range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + (i * step));
  private alphabets = [];
  private currentNo = 0;
  currentAlphabet = '';
  isStopped = false;
  isLowerCase = false;

  constructor(private textSpeakSvc: TextSpeakService) { }

  ngOnInit(): void {
    this.alphabets = this.range('A'.charCodeAt(0), 'Z'.charCodeAt(0), 1).map(x => String.fromCharCode(x));
    this.subscribeEvents();
  }

  ngOnDestroy(): void {
    this.unsubscribeEvents();
  }

  changeCase(e: Event, islower:boolean): void {
    this.isLowerCase = islower;
  }

  start(e: Event): void {

    if (e) { this.isStopped = false; }
    if (this.isStopped) { return; }

    this.currentAlphabet = this.alphabets[this.currentNo++];
    if (this.isLowerCase) { this.currentAlphabet = this.currentAlphabet.toLocaleLowerCase() }
    this.textSpeakSvc.startSpeak(this.currentAlphabet, VoiceTextFrom.Alphabets);
    if (this.currentNo === this.alphabets.length) {
      this.currentNo = 0;
    }
  }

  stop(e: Event): void {
    this.isStopped = true;
  }

  subscribeEvents(): void {
    this.subscriptions.push(this.textSpeakSvc.speakDoneObservable().subscribe((v: VoiceText) => {
      console.log('form alphabets obs: ', v);
      if (!v || v.from !== VoiceTextFrom.Alphabets) { return; }
      this.start(null);
    }));
  }


  unsubscribeEvents(): void {
    this.subscriptions.forEach(v => {
      v.unsubscribe();
    })
  }

}
