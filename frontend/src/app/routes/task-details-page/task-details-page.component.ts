import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-task-details-page',
  templateUrl: './task-details-page.component.html',
  styleUrls: ['./task-details-page.component.css'],
})
export class TaskDetailsPageComponent {
  isDeletePending = false;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

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

  task = this.http.get<any>(
    `http://localhost:3000/functionalities/${this.route.snapshot.params['id']}/tasks/${this.route.snapshot.params['taskId']}`
  );

  deleteTask() {
    this.isDeletePending = true;
    this.http
      .delete(
        `http://localhost:3000/functionalities/${this.route.snapshot.params['id']}/tasks/${this.route.snapshot.params['taskId']}`
      )
      .subscribe(() => {
        this.router.navigate([
          '/functionalities',
          this.route.snapshot.params['id'],
          'details',
        ]);
      });
  }
}
