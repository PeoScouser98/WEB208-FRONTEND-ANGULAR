import {
	CdkDragDrop,
	moveItemInArray,
	transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { Task } from './../../../interfaces/task.interface';

import { Project } from 'src/app/interfaces/project.interface';
import { ProjectService } from 'src/app/services/project.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
	selector: 'tasks-list',
	templateUrl: 'task-list.component.html',
})
export class TasksList implements OnInit {
	@Input() currentProject: Project | any;
	// Get new task from event value Project page got
	@Input() newTask: Task | any;
	@Input() todos: Array<Task> | any;
	@Input() inProgress: Array<Task> | any;
	@Input() done: Array<Task> | any;
	isFetching: boolean = false;
	constructor(
		public projectService: ProjectService,
		private taskService: TaskService
	) {}

	ngOnInit() {}

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
