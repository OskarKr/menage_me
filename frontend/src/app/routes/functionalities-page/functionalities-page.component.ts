import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-functionalities-page',
  templateUrl: './functionalities-page.component.html',
  styleUrls: ['./functionalities-page.component.css'],
})
export class FunctionalitiesPageComponent {
  constructor(private http: HttpClient) {}

  priorityClassNameMap = {
    LOW: 'border-green-500 bg-green-200',
    MEDIUM: 'border-yellow-500 bg-yellow-200',
    HIGH: 'border-red-500 bg-red-200',
  };

  statusClassNameMap = {
    TODO: 'border-gray-500 bg-gray-200',
    IN_PROGRESS: 'border-blue-500 bg-blue-200',
    DONE: 'border-green-500 bg-green-200',
  };

  functionalities = this.http.get<any>('http://localhost:3000/functionalities');
}
