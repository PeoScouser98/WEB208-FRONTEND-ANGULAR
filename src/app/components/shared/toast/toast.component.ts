import { Component } from '@angular/core';
import { ToastService } from 'src/app/services/toast.service';

@Component({
	selector: 'app-toast',
	template: /* html */ ` <div
		*ngIf="toast.show"
		class="toast-center toast toast-top"
	>
		<div [ngClass]="'alert min-w-[240px] font-medium ' + toast.type">
			<div>
				<ng-container [ngSwitch]="toast.type" ]>
					<span *ngSwitchCase="'alert-success'">
						<i class="bi bi-check-circle"></i>
					</span>
					<span *ngSwitchCase="'alert-info'">
						<i class="bi bi-info-circle"></i>
					</span>
					<span *ngSwitchCase="'alert-error'">
						<i class="bi bi-x"></i>
					</span>
					<span *ngSwitchDefault>default</span>
				</ng-container>
				<span> {{ toast.message }}</span>
			</div>
		</div>
	</div>`,
})
export class ToastComponent {
	constructor(public toast: ToastService) {}
}
