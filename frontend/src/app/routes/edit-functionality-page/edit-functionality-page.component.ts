import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-functionality-page',
  templateUrl: './edit-functionality-page.component.html',
  styleUrls: ['./edit-functionality-page.component.css'],
})
export class EditFunctionalityPageComponent {
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

  ngOnInit(): void {
    const functionalityId = parseInt(this.route.snapshot.params['id']);
    const url = `http://localhost:3000/functionalities/${functionalityId}`;

    this.form.disable();
    this.http
      .get<any>(url)
      .subscribe((task) => {
        this.form.patchValue({
          name: task.name,
          description: task.description,
          priority: task.priority,
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
    const url = `http://localhost:3000/functionalities/${functionalityId}`;

    this.http
      .put(url, this.form.value)
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
