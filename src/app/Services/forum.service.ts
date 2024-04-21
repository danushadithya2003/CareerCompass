import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '../Models/question.model';

@Injectable({
  providedIn: 'root',
})

export class ForumService{
    token: string = localStorage.getItem('token');
    queryparams = new HttpParams()
    .set('token',this.token);
    constructor(private http:HttpClient){

    }

    getQuestions(skillId:string):Observable<any>{
        return this.http.get<any>(`https://apicareercompass.azurewebsites.net/${skillId}/question`,{params:this.queryparams})
    }

    addQuestion(skillId:string, title:string, content:string){
        const body = {
                "skillID": skillId,
                "title": title,
                "Content": content
        }
        return this.http.post(`https://apicareercompass.azurewebsites.net/question`,body,{params:this.queryparams})
    }
    addAnswer(questionId:string,answer:string) {
        const body = {
            "questionID": questionId,
            "content": answer
        }

        return this.http.post(`https://apicareercompass.azurewebsites.net/answer`,body,{params:this.queryparams})
    }
}