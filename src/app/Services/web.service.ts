import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class WebService {
  constructor(private http: HttpClient, private video:string, private results:RegExpMatchArray) {}

  getTitleFromUrl(url: string) {
    return this.http
      .get(url, { responseType: 'text' })
      .pipe(
        map((html) => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, 'text/html');
          const titleElement = doc.querySelector('title');
          return titleElement ? titleElement.textContent : 'Title not found';
        }),
        catchError((error) => {
          console.error('Error fetching URL:', error);
          return of('Error fetching title');
        })
      )
      .subscribe((data) => {
        return data;
      });
  }

  getThumb(url: string, size: string) {
    if (url === null) {
      return '';
    }

    size = size === null ? 'big' : size;
    this.results = url.match('[\\?&]v=([^&#]*)');
    this.video = this.results === null ? url : this.results[1];
    if (size === 'small') {
      return 'http://img.youtube.com/vi/' + this.video + '/2.jpg';
    }
    return 'http://img.youtube.com/vi/' + this.video + '/0.jpg';
  }
}
