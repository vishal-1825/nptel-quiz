import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { QuestionComponent } from './question/question.component';
import { HeaderComponent } from './header/header.component';
import { provideHttpClient } from '@angular/common/http';
import { QuestionService } from './service/question.service';
import { ChangeBgDirective } from './change-bg.directive';

// provideHttpClient is needed for the HTTP call
// previously HttpClientModule was use which is deprecated now

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    QuestionComponent,
    HeaderComponent,
    ChangeBgDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [
    QuestionService,
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
