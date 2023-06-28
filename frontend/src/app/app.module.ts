import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FunctionalitiesPageComponent } from './routes/functionalities-page/functionalities-page.component';
import { FunctionalityDetailsPageComponent } from './routes/functionality-details-page/functionality-details-page.component';
import { CreateFunctionalityPageComponent } from './routes/create-functionality-page/create-functionality-page.component';
import { CreateTaskPageComponent } from './routes/create-task-page/create-task-page.component';
import { TaskDetailsPageComponent } from './routes/task-details-page/task-details-page.component';
import { EditTaskPageComponent } from './routes/edit-task-page/edit-task-page.component';
import { EditFunctionalityPageComponent } from './routes/edit-functionality-page/edit-functionality-page.component';

@NgModule({
  declarations: [
    AppComponent,
    FunctionalitiesPageComponent,
    FunctionalityDetailsPageComponent,
    CreateFunctionalityPageComponent,
    CreateTaskPageComponent,
    TaskDetailsPageComponent,
    EditTaskPageComponent,
    EditFunctionalityPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
