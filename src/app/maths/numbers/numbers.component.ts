import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { VoiceText, VoiceTextFrom } from 'src/app/core/models/voice-text';
import { StyleService } from 'src/app/core/services/style/style.service';
import { TextSpeakService } from 'src/app/core/services/text-speak.service';

@Component({
  selector: 'app-numbers',
  templateUrl: './numbers.component.html',
  styleUrls: ['./numbers.component.scss']
})
export class NumbersComponent implements OnInit, OnDestroy {
  private subscriptions: Array<Subscription> = [];
  startFrom = 0;
  currentNo: number;
  isStopped = false;
  @ViewChild('currentResult', { read: ElementRef }) currentResult: ElementRef;

  constructor(private textSpeakSvc: TextSpeakService,
    private styleSvc: StyleService) { }

  ngOnInit(): void {
    this.updateCurrentNumber(undefined);
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
    
  //  this.styleSvc.removeClass(this.currentResult.nativeElement,'shake');
    this.currentNo++;
    this.textSpeakSvc.startSpeak(this.currentNo.toString(), VoiceTextFrom.Numbers);
  //  this.styleSvc.addClassWithTimer(this.currentResult.nativeElement,'shake',100);

  }

  stop(e: Event): void {
    this.isStopped = true;
  }

  subscribeEvents(): void {
    this.subscriptions.push(this.textSpeakSvc.speakDoneObservable().subscribe((v: VoiceText) => {
      console.log('form numbers obs: ', v);
      if (!v || v.from !== VoiceTextFrom.Numbers) { return; }
      this.start(null);
    }));
  }

  unsubscribeEvents(): void {
    this.subscriptions.forEach(v => {
      v.unsubscribe();
    })
  }
}
