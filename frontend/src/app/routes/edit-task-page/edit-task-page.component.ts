import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-task-page',
  templateUrl: './edit-task-page.component.html',
  styleUrls: ['./edit-task-page.component.css'],
})
export class EditTaskPageComponent {
  isSubmitting = false;
  form = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    priority: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
  });

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.form.disable();
    this.http
      .get<any>(
        `http://localhost:3000/functionalities/${this.route.snapshot.params['id']}/tasks/${this.route.snapshot.params['taskId']}`
      )
      .subscribe((task) => {
        this.form.patchValue({
          name: task.name,
          description: task.description,
          priority: task.priority,
          status: task.status,
        });
      })
      .add(() => {
        this.form.enable();
      });
  }

  onSubmit() {
    if (!this.form.valid) {
      this.snackBar.open('Please fill in all required fields.', 'Close', {
        duration: 2000,
      });

      return;
    }

    this.isSubmitting = true;
    this.form.disable();

    const functionalityId = parseInt(this.route.snapshot.params['id']);
    const taskId = parseInt(this.route.snapshot.params['taskId']);
    const url = `http://localhost:3000/functionalities/${functionalityId}/tasks/${taskId}`;

    this.http
      .put(url, this.form.value)
      .subscribe(() => {
        this.snackBar.open('Task updated successfully.', 'Close', {
          duration: 2000,
        });

        this.router.navigate([
          '/functionalities',
          functionalityId,
          'task',
          taskId,
        ]);
      })
      .add(() => {
        this.isSubmitting = false;
        this.form.enable();
      });
  }
}
