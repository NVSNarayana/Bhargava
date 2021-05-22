import { Injectable } from '@angular/core';
import { timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StyleService {

  constructor() { }

  addClass(ele:HTMLElement, clsName: string):void{
    if(!ele || !clsName){return;}
    ele.classList.add(clsName);
  }

  addClassWithTimer(ele:HTMLElement, clsName: string, time:number):void{
    if(!ele || !clsName || !time){return;}
    timer(time).subscribe(t=>{
      ele.classList.add(clsName);
    });
  }

  removeClass(ele:HTMLElement, clsName: string):void{
    if(!ele || !clsName || !ele.classList){return;}
    ele.classList.remove(clsName);
  }
}
