import { ToastService } from './services/toast.service';
import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	template: /* html */ `
		<app-toast></app-toast>
		<router-outlet></router-outlet>
	`,
})
export class AppComponent {
	title = 'angular_assignment';
}
