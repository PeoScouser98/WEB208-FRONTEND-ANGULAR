import {
	HttpErrorResponse,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
	constructor(private authService: AuthService) {}
	auth: string = localStorage.getItem('auth')!;
	intercept(request: HttpRequest<any>, next: HttpHandler) {
		// Get token from local storage
		const accessToken = localStorage.getItem('accessToken');
		request = request.clone({
			setHeaders: {
				Authorization: `Bearer ${accessToken}`,
			},
		});
		return next.handle(request).pipe(
			catchError((error: any) => {
				if (
					error instanceof HttpErrorResponse &&
					(error.status === 401 || error.status === 403)
				) {
					console.log('[ERROR] Access token has expired!');
					// Continue to send previos request
					return this.authService.refreshToken(this.auth).pipe(
						switchMap((newToken: any) => {
							console.log('[INFO] New access token:>>', newToken);
							localStorage.setItem('accessToken', newToken);
							request = request.clone({
								setHeaders: {
									authorization: `Bearer ${newToken}`,
								},
							});
							return next.handle(request);
						}),
						catchError((refreshError: any) => {
							if (
								refreshError instanceof HttpErrorResponse &&
								(error.status === 401 || error.status === 403)
							) {
								this.authService.logout();
							}
							return throwError(refreshError);
						})
					);
				}
				return throwError(error);
			})
		);
	}
}
