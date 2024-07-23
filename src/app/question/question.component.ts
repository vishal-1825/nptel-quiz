import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../service/question.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrl: './question.component.scss'
})
export class QuestionComponent implements OnInit {

  public name : string="";
  public questionList: any = [];
  public currentQuestion: number = 0;
  public points: number = 0;
  totalTime: number = 7200;
  counter: number = this.totalTime;
  correctAns: number = 0;
  incorrectAns: number = 0;
  interval$: any;
  progress: string = "0";
  isQuizCompleted: boolean = false;

  constructor(private questionService : QuestionService) {

  }
  
  ngOnInit(): void {
    this.name = localStorage.getItem("name")!;
    // If I don't use '!'
    //   [ERROR] TS2322: Type 'string | null' is not assignable to type 'string'.
    // Type 'null' is not assignable to type 'string'. [plugin angular-compiler]
    this.getAllQuestions();
    this.startCounter();
  }

  // calls the function inside question.service.ts (QuestionService) which is passed through the contructor as questionService
  getAllQuestions() {
    this.questionService.getQuestionJson()
    .subscribe(res => {
      this.questionList = res.questions;
      console.log(res.questions);
    })
  }

  nextQuestion() {
    this.currentQuestion++;
    this.getProgress();
    if (this.currentQuestion==this.questionList.length) this.isQuizCompleted=true;
  }

  prevQuestion() {
    this.currentQuestion--;
    this.getProgress();
  }

  markAnswer(currentQno: number, option: any) {
    if (option.text===this.questionList[currentQno-1].answer) {
      this.points+=2;
      this.correctAns++;
    }
    else {
      this.incorrectAns++; 
    }
    setTimeout(() => {
      this.nextQuestion();
    }, 600);
    
  }

  startCounter() {
    this.interval$ = interval(1000)
    .subscribe(val => {
      this.counter--;
      if (this.counter===0){
        // this.counter=this.totalTime;
        this.nextQuestion();
        this.isQuizCompleted=true;
      }
    }); // interval$ is observable and interval is module imported from rxjs
    setTimeout(() => {
      this.interval$.unsubscribe();
    }, 6000000);
  }

  stopCounter() {
    this.interval$.unsubscribe();
    this.counter=0;
  }

  resetCounter() {
    this.stopCounter();
    this.counter=this.totalTime;
    this.startCounter();
  }

  resetQuiz() {
    this.resetCounter();
    this.getAllQuestions();
    this.points=0;
    this.correctAns=0;
    this.incorrectAns=0;
    this.currentQuestion=0;
    this.progress="0";
    this.getProgress();
  }

  getProgress() {
    this.progress = ((this.currentQuestion/this.questionList.length)*100).toString();
    return this.progress;
  }

  formatTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secondsLeft = seconds % 60;
  
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secondsLeft.toString().padStart(2, '0')}`;
  }  
}
