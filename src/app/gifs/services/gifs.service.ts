import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse, Pagination } from '../interface/gifs.interface';

@Injectable({providedIn: 'root'})
export class GifsService {

  public gifList: Gif[] = [];
  private _tagsHistory: string[] = [];
  private apiKey:string = 'HQnY2DbLWcLaACpMSXGLd08qdFq0eRJp';
  private apiUrl:string = 'https://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient) {
    this.loadLocalStorage();
    console.log('Cargando desde el localStorage...');
  }

  get tagsHistory(){
    return [...this._tagsHistory]
  }

  organizeTags(tag: string):void{
    if(this._tagsHistory.includes(tag)){
      this._tagsHistory = this._tagsHistory.filter((element)=>element !== tag)
    }
    this._tagsHistory.unshift(tag);
    this.saveLocalStorage();
  }

  private saveLocalStorage(){
    localStorage.setItem('history',JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage(){
    if(!localStorage.getItem('history')){
      return;
    }
    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);
    if(this._tagsHistory.length === 0) return;
    this.searchTag(this.tagsHistory[0]);
  }

  searchTag(tag: string):void{
    if(tag.length == 0) return;
    this.organizeTags(tag);

    const params = new HttpParams()
      .set('api_key',this.apiKey)
      .set('limit','10')
      .set('q',tag)

    this.http.get<SearchResponse>(`${this.apiUrl}/search`,{params})
    .subscribe(resp=>{
      this.gifList = resp.data;
    })
  }
}


