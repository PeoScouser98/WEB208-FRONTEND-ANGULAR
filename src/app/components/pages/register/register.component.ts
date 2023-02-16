import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interfaces/user.interface';
import { ToastComponent } from '../../shared/toast/toast.component';
import { ToastService } from 'src/app/services/toast.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
})
export class RegisterPage {
	constructor(
		private authenticateService: UserService,
		private toast: ToastService,
		private router: Router
	) {
		//
	}
	registerForm = new FormGroup({
		email: new FormControl('', [Validators.required, Validators.email]),
		password: new FormControl('', [
			Validators.required,
			Validators.minLength(6),
		]),
		username: new FormControl('', [
			Validators.required,
			Validators.minLength(3),
		]),
	});
	onSubmit() {
		if (this.registerForm.invalid) {
			Object.values(this.form).forEach((control) => {
				if (control.invalid) {
					control.markAsDirty();
					control.updateValueAndValidity();
				}
			});
			return;
		}
		this.authenticateService
			.register(this.registerForm.value as Partial<User>)
			.subscribe((data) => {
				console.log(data);
				this.toast.success('Registed success fully!');
				this.router.navigate(['/login']);
			});
	}
	get form() {
		return this.registerForm.controls;
	}
}
