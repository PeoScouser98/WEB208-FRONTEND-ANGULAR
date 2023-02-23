import { TaskService } from './../../../services/task.service';
import { ProjectService } from './../../../services/project.service';
import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/interfaces/project.interface';
@Component({
	selector: 'homepage',
	templateUrl: 'dashboard.component.html',
})
export class Dashboard implements OnInit {
	allJoinedProjects: Array<Project> = [];
	constructor(
		private projectService: ProjectService,
		private taskService: TaskService
	) {}

	ngOnInit() {
		this.projectService.getAllJoinedProjects().subscribe(
			(data) => {
				console.log(data);
				this.allJoinedProjects = data.map((item) => {
					return {
						...item,
						inCompleted: item.tasks?.filter(
							(task) => task.status !== 'COMPLETED'
						)?.length,
						completed: item.tasks?.filter(
							(task) => task.status === 'COMPLETED'
						)?.length,
					};
				});
				console.log(this.allJoinedProjects);
			},
			({ error }) => {
				console.log(error.message);
			}
		);
	}
}
