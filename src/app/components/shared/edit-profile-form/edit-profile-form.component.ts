import { User } from './../../../interfaces/user.interface';
import { ToastService } from 'src/app/services/toast.service';
import { AuthGuardService } from '../../../services/authGuard.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
	selector: 'edit-profile-form',
	templateUrl: 'edit-profile-form.component.html',
})
export class EditUserInfo implements OnInit {
	currentUser: Partial<User> = {};

	constructor(
		public authGuardService: AuthGuardService,
		private userService: AuthService,
		private toastService: ToastService
	) {}

	editProfile() {
		this.userService
			.editProfile(this.authGuardService.currentUser)
			.subscribe(
				(data) => {
					console.log(data);
					this.toastService.success('Edited profile successfully!');
				},
				({ error }) => {
					console.log(error);
				}
			);
	}
	ngOnInit() {
		console.log(this.authGuardService.currentUser);
		this.currentUser = this.authGuardService.currentUser;
	}
}
