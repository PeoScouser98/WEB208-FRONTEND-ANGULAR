import { AuthGuardService } from './../../../services/authGuard.service';
import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';

@Component({
	selector: 'selector-name',
	templateUrl: 'account-page.component.html',
})
export class AccountPage implements OnInit {
	constructor(
		public authService: AuthGuardService,
		public projectService: ProjectService
	) {}

	ngOnInit() {}
}
