import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})



export class QuestionService {

  constructor(private http: HttpClient) {
 
  }

  // This is service is used to call the questions.json
  getQuestionJson(){
    return this.http.get<any>('assets/questions.json');
  }
}
