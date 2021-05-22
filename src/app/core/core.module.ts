import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import { SocketIoModule } from 'ngx-socket-io';
import { TextSpeakService } from './services/text-speak.service';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    SocketIoModule.forRoot(environment.socketIoConfig)
  ],
  providers:[TextSpeakService]
})
export class CoreModule { }
