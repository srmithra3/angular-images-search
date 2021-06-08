import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private endpoint = 'https://api.imgur.com/3/gallery/search/?q=cats';
  private apiClientId: String;

  constructor(private http: HttpClient) { 
    this.getApiKey();
  }

  getApiKey() {
    this.apiClientId = "b067d5cb828ec5a";
  }

  getPhotos(keyword: string) {
    return this.http.get(this.endpoint,{headers: new HttpHeaders().set('Authorization', 'b067d5cb828ec5a')});
  }
}