import { AuthorizationService } from 'src/app/services/authorization.service';
import { LoginData } from './../../../interfaces/user.interface';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
})
export class LoginPage {
	constructor(
		private authService: UserService,
		private router: Router,
		private authorizationService: AuthorizationService
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
		console.log(this.loginForm.value);
		this.authService
			.login(this.loginForm.value)
			.subscribe((data: LoginData) => {
				console.log(data);
				localStorage.setItem('accessToken', data.accessToken);
				localStorage.setItem('auth', JSON.stringify(data.user));
				this.authorizationService.handleStorageEvent(
					new StorageEvent('storage', {
						key: 'auth',
						oldValue: null,
						newValue: JSON.stringify(data.user),
						url: window.location.href,
					})
				);
				this.router.navigate(['']);
			});
	}
	get form() {
		return this.loginForm.controls;
	}
}
