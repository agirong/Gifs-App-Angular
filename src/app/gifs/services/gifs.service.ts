import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interface/gifs.interface';

@Injectable({providedIn: 'root'})
export class GifsService {

  private _tagsHistory: string[] = [];
  private apiKey:string = 'HQnY2DbLWcLaACpMSXGLd08qdFq0eRJp';
  private apiUrl:string = 'https://api.giphy.com/v1/gifs';
  public tagList:Gif[] = [];

  constructor(private http: HttpClient) { }

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

    const params = new HttpParams()
      .set('api_key',this.apiKey)
      .set('limit','10')
      .set('q',tag)

    this.http.get<SearchResponse>(`${this.apiUrl}/search`,{params})
    .subscribe(resp=>{
      this.tagList = resp.data;
      console.log(this.tagList)
    })
  }
}


