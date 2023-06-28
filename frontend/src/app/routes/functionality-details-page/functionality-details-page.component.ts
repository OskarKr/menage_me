import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-functionality-details-page',
  templateUrl: './functionality-details-page.component.html',
  styleUrls: ['./functionality-details-page.component.css'],
})
export class FunctionalityDetailsPageComponent {
  isDeletePending = false;

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

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  functionality = this.http.get<any>(
    `http://localhost:3000/functionalities/${this.route.snapshot.params['id']}`
  );

  deleteFunctionality() {
    const functionalityId = parseInt(this.route.snapshot.params['id']);
    const url = `http://localhost:3000/functionalities/${functionalityId}`;

    this.isDeletePending = true;
    this.http.delete(url).subscribe(() => {
      this.router.navigate(['/functionalities']);
    });
  }
}
