import { Component } from '@angular/core';
import { ToastService } from 'src/app/services/toast.service';

@Component({
	selector: 'app-toast',
	templateUrl: 'toast.component.html',
})
export class ToastComponent {
	constructor(public toast: ToastService) {}
}
