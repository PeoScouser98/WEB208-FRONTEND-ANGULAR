import { Injectable } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	CanActivate,
	Router,
	RouterStateSnapshot,
} from '@angular/router';
import { User } from '../interfaces/user.interface';

@Injectable({ providedIn: 'root' })
export class AuthorizationService implements CanActivate {
	currentUser: Omit<User, 'password'> | null = JSON.parse(
		localStorage.getItem('auth')!
	);
	isLoggedIn: boolean = !!this.currentUser;
	constructor(private router: Router) {
		window.addEventListener('storage', this.handleStorageEvent.bind(this));
	}
	canActivate(
		router: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): boolean {
		if (!this.isLoggedIn) {
			this.router.navigate(['/login']);
			this.isLoggedIn = false;
			return false;
		}

		this.isLoggedIn = true;
		return true;
	}

	handleStorageEvent(event: StorageEvent) {
		if (event.key === 'auth') {
			this.currentUser = JSON.parse(event.newValue!);
			this.isLoggedIn = !!this.currentUser;
			if (!event.newValue) this.router.navigate(['/login']);
		}
	}
}
