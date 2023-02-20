import {
	Component,
	EventEmitter,
	Input,
	OnInit,
	Output,
	OnChanges,
} from '@angular/core';
import { Task } from './../../../interfaces/task.interface';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/user.interface';
import { TaskService } from 'src/app/services/task.service';
import { ToastService } from 'src/app/services/toast.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
	selector: 'add-task-form',
	templateUrl: 'add-task-form.component.html',
})
export class AddTaskForm implements OnInit, OnChanges {
	@Output() addNewTask = new EventEmitter<Task>();
	@Input() currentProject: any;

	todos: Array<Task> = [];

	constructor(
		private taskService: TaskService,
		private toastService: ToastService,
		public projectService: ProjectService
	) {}

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

	ngOnInit() {}
	ngOnChanges() {}
	addTask() {
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
		this.taskService
			.createTask(
				{
					project: this.currentProject._id,
					...this.addTaskForm.value,
				} as Partial<User>,
				this.currentProject._id
			)
			.subscribe((data) => {
				this.addNewTask.emit(data as Task); // Emit new task data to project component
				this.toastService.success('Added new task!');
			});
	}

	get form() {
		return this.addTaskForm.controls;
	}
}
