import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
	selector: 'change-password-form',
	templateUrl: 'change-password-form.component.html',
})
export class ChangePasswordForm implements OnInit {
	changePasswordForm = new FormGroup({
		currentPassword: new FormControl('', [Validators.required]),
		newPassword: new FormControl('', [Validators.required]),
	});

	constructor(
		private authService: AuthService,
		private toastService: ToastService
	) {}

	onSubmit() {
		if (this.changePasswordForm.invalid) {
			Object.values(this.form).forEach((control) => {
				if (control.invalid) {
					control.updateValueAndValidity();
					control.markAsDirty();
				}
			});
			return;
		}
		this.authService
			.changePassword(
				this.changePasswordForm.value as {
					currentPassword: string;
					newPassword: string;
				}
			)
			.subscribe(
				(data) => {
					console.log(data);
					this.toastService.success('Change password successfully!');
				},
				({ error }) => {
					this.toastService.error(error.message);
				}
			);
	}

	ngOnInit() {}

	get form() {
		return this.changePasswordForm.controls;
	}
}
