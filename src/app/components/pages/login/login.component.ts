import { AuthGuardService } from 'src/app/services/authGuard.service';
import { LoginData } from './../../../interfaces/user.interface';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
})
export class LoginPage {
	constructor(
		private authService: AuthService,
		private router: Router,
		private authGuardService: AuthGuardService
	) {}
	loginForm = new FormGroup({
		email: new FormControl('', [Validators.required, Validators.email]),
		password: new FormControl('', [Validators.required]),
	});

	onSubmit() {
		if (!this.loginForm.valid) {
			Object.values(this.form).forEach((control) => {
				if (control.invalid) {
					control.markAsDirty();
					control.updateValueAndValidity();
				}
			});
			return;
		}

		this.authService.login(this.loginForm.value).subscribe(
			(data) => {
				localStorage.setItem('auth', data.auth);
				localStorage.setItem('accessToken', data.accessToken);
				this.router.navigate(['']);
			},
			({ error }) => {
				console.log(error);
			}
		);
	}
	get form() {
		return this.loginForm.controls;
	}
}
