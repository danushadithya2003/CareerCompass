import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  token: string = localStorage.getItem('token');
  queryparams = new HttpParams()
  .set('token',this.token);
  
  constructor(private http: HttpClient) {
  }

  getRoles():Observable <any> {
     return this.http.get('https://apicareercompass.azurewebsites.net/role',{params:this.queryparams})
  }

  getRole(id:string):Observable <any> {
    return this.http.get(`https://apicareercompass.azurewebsites.net/${id}/role`,{params:this.queryparams})
  }

  searchRole(name:string):Observable<any> {
    return this.http.get(`https://apicareercompass.azurewebsites.net/search?searchBy=role&searchValue=${name}`,{params:this.queryparams})
  }
}
