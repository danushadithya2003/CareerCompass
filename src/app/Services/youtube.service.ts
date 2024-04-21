import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class YoutubeService {
  constructor(private http: HttpClient) {}

  getInfo(videoId: string):Observable<any> {
    const apikey = 'AIzaSyDJ0MSCoENP6lBs51xmX_ZIwYQcRDUbTQ4';
    return this.http
      .get(
        `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apikey}&part=snippet,statistics`
      )
      .pipe(
        map((response: any) => {
          const video = response.items[0];
          return {
            title: video.snippet.title,
            thumbnailUrl: video.snippet.thumbnails.medium.url,
            viewCount: video.statistics.viewCount,
            likeCount:video.statistics.likeCount
          };
        })
      );
  }
}
