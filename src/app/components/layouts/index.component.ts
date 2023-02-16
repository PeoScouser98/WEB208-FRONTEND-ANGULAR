import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/interfaces/project.interface';
import { User } from 'src/app/interfaces/user.interface';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { ProjectService } from 'src/app/services/project.service';
import { ToastService } from 'src/app/services/toast.service';
import { UserService } from 'src/app/services/user.service';

@Component({
	selector: 'selector-name',
	templateUrl: 'index.component.html',
})
export class Dashboard implements OnInit {
	breadcrumbs: Array<any> = [];
	isOpen: boolean = false;
	constructor(
		public toast: ToastService,
		public authService: AuthorizationService,
		public activatedRoute: ActivatedRoute,
		public router: Router,
		public projectService: ProjectService,
		public userService: UserService
	) {}
	ngOnInit(): void {
		this.projectService
			.getAllProjects()
			.subscribe(
				(data) =>
					(this.projectService.projects = data as Array<Project>)
			);
	}
	currentUser: Omit<User, 'password'> | null = JSON.parse(
		localStorage.getItem('auth')!
	);
}
