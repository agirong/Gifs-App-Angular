import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class GifsService {

  private _tagsHistory: string[] = [];

  constructor() { }

  get tagsHistory(){
    return [...this._tagsHistory]
  }

  organizeTags(tag: string):void{
    if(this._tagsHistory.includes(tag)){
      this._tagsHistory = this._tagsHistory.filter((element)=>element !== tag)
    }
    this._tagsHistory.unshift(tag);
  }

  searchTag(tag: string):void{
    if(tag.length == 0) return;

    this.organizeTags(tag);

    console.log(this._tagsHistory);
  }
}
