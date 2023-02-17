import { Injectable } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	CanActivate,
	Router,
	RouterStateSnapshot,
} from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuardService implements CanActivate {
	currentUser: any = null;
	accessToken: string | null = null;
	isLoggedIn: boolean = false;
	constructor(private route: Router) {
		this.isLoggedIn =
			!!localStorage.getItem('accessToken') &&
			!!localStorage.getItem('auth');
	}
	canActivate(
		router: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): boolean {
		if (!localStorage.getItem('accessToken')) {
			this.route.navigate(['/login']);
			this.isLoggedIn = false;
			return false;
		}

		this.isLoggedIn = true;
		return true;
	}
}
