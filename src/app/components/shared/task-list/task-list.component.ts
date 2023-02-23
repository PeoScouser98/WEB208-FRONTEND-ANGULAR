import { ToastService } from 'src/app/services/toast.service';
import {
	CdkDragDrop,
	moveItemInArray,
	transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Task } from './../../../interfaces/task.interface';

import { Project } from 'src/app/interfaces/project.interface';
import { ProjectService } from 'src/app/services/project.service';
import { TaskService } from 'src/app/services/task.service';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';

@Component({
	selector: 'tasks-list',
	templateUrl: 'task-list.component.html',
	styleUrls: ['./task-list.component.css'],
})
export class TasksList implements OnInit {
	@Input() currentProject: Project | any;
	@Input() listTitle: string | any;
	@Input() listData: Array<Task> | any;
	@Input() status: string | any;
	@Output() updateTask = new EventEmitter<Task>();
	taskToEdit: Task | any;

	isFetching: boolean = false;
	constructor(
		public projectService: ProjectService,
		public taskService: TaskService,
		private toastService: ToastService
	) {}

	ngOnInit() {}

	setTaskToEdit(task: Task) {
		this.taskService.taskToEdit = task;
	}

	deleteTask(deletedTask: Task) {
		this.taskService
			.deleteTask(deletedTask._id, deletedTask.project as string)
			.subscribe(
				(data) => {
					this.listData = this.listData.filter(
						(task: Task) => task._id !== deletedTask._id
					);
					this.toastService.info('Deleted this task !');
				},
				({ error }) => {
					this.toastService.error(error);
				}
			);
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
				.updateTask(this.currentProject._id, task._id, {
					status: newStatus,
				})
				.subscribe((data) => {
					console.log(data);
				});
		}
	}
}
