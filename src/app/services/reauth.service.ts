import { AuthService } from 'src/app/services/auth.service';
import { Injectable } from '@angular/core';
import {
	HttpInterceptor,
	HttpHandler,
	HttpRequest,
	HttpErrorResponse,
	HttpEvent,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {
	constructor(private authService: AuthService) {}
	credential: string | null = JSON.parse(localStorage.getItem('auth')!);
	intercept(
		req: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		return next.handle(req).pipe(
			catchError((err: HttpErrorResponse) => {
				if (err.status === 401 && !req.url.includes('/refresh-token')) {
					return this.authService.refreshToken(this.credential!).pipe(
						switchMap((accessToken: any) => {
							if (accessToken) {
								// Save the new token
								localStorage.setItem(
									'accessToken',
									accessToken
								);
								// Clone the original request and add the new token
								const authReq = req.clone({
									headers: req.headers.set(
										'Authorization',
										`Bearer ${accessToken}`
									),
								});
								// Resend the cloned request
								return next.handle(authReq);
							}
							// Logout the user if refresh token has expired
							this.authService.logout();
							return throwError(err);
						})
					);
				}
				return throwError(err);
			})
		);
	}
}
