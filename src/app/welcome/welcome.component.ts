import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

/*
ViewChild
Property decorator that configures a view query. The change detector looks for the first element 
or the directive matching the selector in the view DOM. If the view DOM changes, and a new child 
matches the selector, the property is updated.
*/

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss'
})
export class WelcomeComponent implements OnInit {
  
  @ViewChild('name') nameKey!: ElementRef; // 'name' must match template reference variable #name in HTML input field tag

  constructor() {

  }

  ngOnInit(): void {

  }
  
  startQuiz(){
    localStorage.setItem("name", this.nameKey.nativeElement.value); // to store name while clicking start quiz button
    // to do this you need to import viewchild & elementref and declare it above
  }
}
