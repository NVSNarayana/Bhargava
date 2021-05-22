import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { VoiceText, VoiceTextFrom } from '../models/voice-text';

@Injectable({
  providedIn: 'root'
})
export class TextSpeakService {

  constructor(private socket: Socket) {

  }

  startSpeak(data: string, from: VoiceTextFrom): void {
    const obj = new VoiceText({ text: data, from })
    this.socket.emit('speakNumbers', obj);
  }

  speakDoneCallback(cb: Function): void {
    this.socket.on('speakDone', cb);

  }

  speakDoneObservable(): Observable<any> {
    return this.socket.fromEvent('speakDone');
  }

  stopSpeak(data: string): void {
  }
}
