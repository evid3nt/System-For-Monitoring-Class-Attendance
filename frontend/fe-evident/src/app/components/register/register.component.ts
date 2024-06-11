import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { UserDTO } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [ReactiveFormsModule, RouterModule, CommonModule, FormsModule, MatSnackBarModule],
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService,  private router: Router, private snackBar: MatSnackBar) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      userRole: ['', Validators.required],
      cardId: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const formValues = this.registerForm.value;
      const user = new UserDTO(
        formValues.firstName,
        formValues.lastName,
        formValues.userRole,
        "0",
        formValues.cardId,
        formValues.email,
        formValues.password
      );
      this.userService.register(user).subscribe(
        (response: any) => {
          this.snackBar.open('User registered successfully', 'Close', {
            duration: 3000, // trajanje obavijesti u milisekundama
          });
          this.router.navigate(['/login']);
        },
        (error: any) => {
          this.snackBar.open('Error registering user', 'Close', {
            duration: 3000, // trajanje obavijesti u milisekundama
          });
        }
      );
    }
  }
}
