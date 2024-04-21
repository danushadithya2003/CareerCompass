import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SkillsService {
  token: string = localStorage.getItem('token');
  queryparams = new HttpParams()
  .set('token',this.token);
  
  constructor(private http: HttpClient) {
  }

  getSkills():Observable <any> {
     return this.http.get('https://apicareercompass.azurewebsites.net/skill',{params:this.queryparams})
  }

  getSkill(id:string):Observable <any> {
    return this.http.get(`https://apicareercompass.azurewebsites.net/${id}/skill`,{params:this.queryparams})
  }

  searchSkill(name:string):Observable<any> {
    return this.http.get(`https://apicareercompass.azurewebsites.net/search?searchBy=skill&searchValue=${name}`,{params:this.queryparams})
  }
}
