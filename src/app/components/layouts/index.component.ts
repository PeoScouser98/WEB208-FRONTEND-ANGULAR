import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/interfaces/project.interface';
import { AuthService } from 'src/app/services/auth.service';
import { AuthGuardService } from 'src/app/services/authGuard.service';
import { ProjectService } from 'src/app/services/project.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
	selector: 'selector-name',
	templateUrl: 'index.component.html',
})
export class Dashboard implements OnInit {
	theme: string = localStorage.getItem('theme')!;
	isFetching: boolean = false;
	constructor(
		public toast: ToastService,
		public authGuardService: AuthGuardService,
		public activatedRoute: ActivatedRoute,
		public router: Router,
		public projectService: ProjectService,
		public authService: AuthService
	) {
		if (!localStorage.getItem('theme')) {
			localStorage.setItem('theme', 'light');
		}
	}

	ngOnInit(): void {
		this.isFetching = true;
		this.authService.getUser().subscribe((data) => {
			this.authGuardService.currentUser = data;
			this.authGuardService.isLoggedIn = true;
		});
		this.projectService.getAllJoinedProjects().subscribe((data) => {
			this.projectService.projects = data as Array<Project>;
		});
		this.isFetching = false;
	}

	onCreateNewProject(newProject: Project) {
		this.projectService.projects.push(newProject);
	}
	onDeleteProject(deletedProject: Project) {
		this.projectService.projects.filter(
			(project) => project._id !== deletedProject._id
		);
	}
	setTheme(theme: string) {
		this.theme = theme;
		localStorage.setItem('theme', theme);
	}
}
