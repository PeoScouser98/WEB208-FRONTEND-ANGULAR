import { Task } from './../../../interfaces/task.interface';
import {
	CdkDragDrop,
	moveItemInArray,
	transferArrayItem,
} from '@angular/cdk/drag-drop';

import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/interfaces/project.interface';
import { ProjectService } from 'src/app/services/project.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
	selector: 'app-project-page',
	templateUrl: './project-page.component.html',
})
export class ProjectPage {
	currentProject: Project | any = null;
	isFetching: boolean = false;
	isError: boolean = false;

	todos: Array<Task> = [];
	inProgress: Array<Task> = [];
	done: Array<Task> = [];

	addTaskForm = new FormGroup({
		title: new FormControl('', [
			Validators.required,
			Validators.minLength(3),
		]),
		description: new FormControl('', [Validators.required]),
		assignee: new FormControl('', [Validators.required]),
		startedAt: new FormControl('', [Validators.required]),
		deadline: new FormControl('', [Validators.required]),
	});

	constructor(
		private route: ActivatedRoute,
		public projectService: ProjectService,
		private taskService: TaskService
	) {}

	ngOnInit() {
		this.route.params.subscribe(({ id }) => {
			this.fetchCurrentProject(id);
		});
	}

	fetchCurrentProject(id: string) {
		this.isFetching = true;
		this.projectService.getProject(id).subscribe(
			(data) => {
				console.log(data);
				this.currentProject = data as Project;
				this.todos = data?.tasks.filter(
					(task: Task) => task.status === 'todo'
				);
				this.done = data?.tasks.filter(
					(task: Task) => task.status === 'done'
				);
				this.inProgress = data?.tasks.filter(
					(task: Task) => task.status === 'in_progress'
				);
				this.isFetching = false;
			},
			(error) => {
				console.log('[ERROR]:>>', error.error);
				this.isFetching = false;
				this.isError = true;
			}
		);
	}

	addTodo() {
		console.log(this.addTaskForm.value);
		if (this.addTaskForm.invalid) {
			Object.values(this.form).forEach((control) => {
				if (control.invalid) {
					control.markAsDirty();
					control.updateValueAndValidity();
				}
			});
			return;
		}
	}

	// update task's status using drag/drop
	drop(event: CdkDragDrop<Task[]>) {
		if (event.previousContainer === event.container) {
			console.log(event);
			moveItemInArray(
				event.container.data,
				event.previousIndex,
				event.currentIndex
			);
		} else {
			transferArrayItem(
				event.previousContainer.data,
				event.container.data,
				event.previousIndex,
				event.currentIndex
			);
			const task = event.container.data[event.currentIndex] as Task;
			const newStatus =
				event.container.element.nativeElement.dataset['status'];
			// update task data
			this.taskService
				.updateTask(task.id, { status: newStatus })
				.subscribe((data) => {
					console.log(data);
				});
		}
	}

	get form() {
		return this.addTaskForm.controls;
	}
}
