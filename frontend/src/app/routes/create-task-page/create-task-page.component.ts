import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-task-page',
  templateUrl: './create-task-page.component.html',
  styleUrls: ['./create-task-page.component.css'],
})
export class CreateTaskPageComponent {
  isSubmitting = false;
  form = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    priority: new FormControl('', Validators.required),
  });

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {}

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
    const url = `http://localhost:3000/functionalities/${functionalityId}/create-task`;

    this.http
      .post(url, {
        ...this.form.value,
        functionalityId,
      })
      .subscribe(() => {
        this.snackBar.open('Functionality created successfully.', 'Close', {
          duration: 2000,
        });

        this.router.navigate(['/functionalities', functionalityId, 'details']);
      })
      .add(() => {
        this.isSubmitting = false;
        this.form.enable();
      });
  }
}
