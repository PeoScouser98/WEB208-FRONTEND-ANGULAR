import { AuthorizationService } from './authorization.service';
import { LoginData } from '../interfaces/user.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import env from '../environment/environment.dev';
import { User } from '../interfaces/user.interface';
import { Observable, ObservableLike } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({ providedIn: 'root' })
export class UserService {
	constructor(
		private httpClient: HttpClient,
		private router: Router,
		private authService: AuthorizationService
	) {}
	getUser() {
		return this.httpClient.get('/user', {
			headers: {
				authorization: 'Bearer ' + localStorage.getItem('accessToken'),
			},
		});
	}
	login(data: Pick<User, 'email' & 'password'>) {
		return this.httpClient.post(
			env.baseUrl + '/login',
			data
		) as Observable<LoginData>;
	}
	register(data: Partial<User>) {
		return this.httpClient.post(
			env.baseUrl + '/register',
			data
		) as Observable<User>;
	}
	refreshToken(credential: string) {
		return this.httpClient.get(
			env.baseUrl + '/refresh-token/' + credential
		);
	}
	logout() {
		localStorage.removeItem('auth');
		localStorage.removeItem('accessToken');
		this.authService.handleStorageEvent(
			new StorageEvent('storage', {
				key: 'auth',
				oldValue: JSON.stringify(this.authService.currentUser),
				newValue: null,
				url: window.location.href,
			})
		);
	}
}
