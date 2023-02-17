import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/interfaces/project.interface';
import { Task } from 'src/app/interfaces/task.interface';
import { User } from 'src/app/interfaces/user.interface';
import { ProjectService } from 'src/app/services/project.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
	selector: 'app-project-page',
	templateUrl: './project-page.component.html',
})
export class ProjectPage {
	newTask: Task | any;
	currentProject: Project | any = null;
	isFetching: boolean = false;
	isError: boolean = false;

	todos: Array<Task> = [];
	inProgress: Array<Task> = [];
	done: Array<Task> = [];

	constructor(
		private route: ActivatedRoute,
		public projectService: ProjectService,
		private taskService: TaskService
	) {}

	ngOnInit() {
		this.route.params.subscribe(({ id }) => {
			this.getCurrentProject(id);
			this.getTasksOfCurrentProject(id);
		});
	}

	getTasksOfCurrentProject(projectId: string) {
		this.isFetching = true;
		this.taskService.getTasksByProject(projectId).subscribe((data) => {
			this.todos = (data as Array<Task>).filter(
				(task: Task) => task.status === 'TODO'
			);
			this.done = (data as Array<Task>).filter(
				(task: Task) => task.status === 'COMPLETED'
			);
			this.inProgress = (data as Array<Task>).filter(
				(task: Task) => task.status === 'IN_PROGRESS'
			);
		});
	}

	// Catch submit event from add task form to get new task value
	onAddNewTask(newTask: Task) {
		console.log('new task :>>>', newTask);
		this.todos.push(newTask); // push new task into todo list
	}

	// Get current project
	getCurrentProject(id: string) {
		this.isFetching = true;
		this.projectService.getJoinedProject(id).subscribe(
			(data) => {
				console.log(data);
				this.currentProject = data as Project;
				console.log(data);
				this.isFetching = false;
			},
			(error) => {
				console.log('[ERROR]:>>', error.error);
				this.isFetching = false;
				this.isError = true;
			}
		);
	}
}
