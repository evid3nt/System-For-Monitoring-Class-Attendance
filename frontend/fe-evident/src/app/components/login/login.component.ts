import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthServiceService } from '../../services/auth-service.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'], 
  standalone: true, 
  imports: [ReactiveFormsModule, RouterModule, CommonModule, FormsModule, MatSnackBarModule],

})
export class LoginComponent implements OnInit{
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthServiceService,
    private snackBar: MatSnackBar,
    private router: Router,
    private dataService: DataService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm?.valid) {
      const email = this.loginForm?.get('email')?.value;
      const password = this.loginForm?.get('password')?.value;
      this.authService.login(email, password).subscribe(
        (response: any) => {
          // Prikazi obavijest o uspesnoj prijavi
          this.snackBar.open('Login successful', 'Close', {
            duration: 3000, // trajanje obavijesti u milisekundama
          });
          this.dataService.setUserData(response);
          this.router.navigate(['/calendar']);
          // Implementacija daljih koraka nakon uspesne prijave
        },
        (error: any) => {
          // Prikazi obavijest o neuspesnoj prijavi
          this.snackBar.open('Login failed. Please check your credentials.', 'Close', {
            duration: 3000, // trajanje obavijesti u milisekundama
          });
          // Implementacija daljih koraka nakon neuspesne prijave
        }
      );
    }
  }
}
