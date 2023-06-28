import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-functionality-page',
  templateUrl: './create-functionality-page.component.html',
  styleUrls: ['./create-functionality-page.component.css'],
})
export class CreateFunctionalityPageComponent {
  isSubmitting = false;
  form = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    priority: new FormControl('', Validators.required),
  });

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router
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

    this.http
      .post('http://localhost:3000/functionalities', this.form.value)
      .subscribe(() => {
        this.snackBar.open('Functionality created successfully.', 'Close', {
          duration: 2000,
        });

        this.router.navigate(['/functionalities']);
      })
      .add(() => {
        this.isSubmitting = false;
        this.form.enable();
      });
  }
}
