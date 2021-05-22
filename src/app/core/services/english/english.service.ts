import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnglishWords } from '../../models/english-word';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class EnglishService {

  constructor(private http: HttpClientService) { }

  getWords(): Observable<EnglishWords> {
    return this.http.get('assets/english/words.json')
  }
}
