import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Project } from "src/app/interfaces/project.interface";
import { Task } from "src/app/interfaces/task.interface";
import { FormBuilder } from "@angular/forms";
import { TaskService } from "src/app/services/task.service";
import { ToastService } from "src/app/services/toast.service";
import { ProjectService } from "src/app/services/project.service";
import { getCurrentDate, getLocaleDateString } from "src/app/utilities/getDate";
@Component({
	selector: "edit-task-form",
	templateUrl: "edit-task-form.component.html",
})
export class EditTaskForm implements OnInit, OnChanges {
	@Input() currentProject: Project | any;
	@Input() taskToEdit: Task | any;
	@Output() editTaskEvent = new EventEmitter<Task>();
	getCurrentDate: () => string = getCurrentDate;

	editTaskForm = new FormGroup({
		title: new FormControl("", [Validators.required, Validators.minLength(3)]),
		description: new FormControl("", [Validators.required]),
		assignee: new FormControl("", [Validators.required]),
		startedAt: new FormControl("", [Validators.required]),
		deadline: new FormControl("", [Validators.required]),
	});
	constructor(
		public projectService: ProjectService,
		public taskService: TaskService,
		private toastService: ToastService
	) {}

	ngOnInit() {}

	ngOnChanges(changes: SimpleChanges) {
		if (changes && this.taskService.taskToEdit) {
			this.editTaskForm.patchValue({
				title: this.taskService.taskToEdit.title,
				description: this.taskService.taskToEdit.description,
				assignee: this.taskService.taskToEdit.assignee._id,
				startedAt: getLocaleDateString(this.taskService.taskToEdit.startedAt),
				deadline: getLocaleDateString(this.taskService.taskToEdit.deadline),
			});
		}
	}
	editTask() {
		if (this.editTaskForm.invalid) {
			Object.values(this.form).forEach((control) => {
				if (control.invalid) {
					control.markAsDirty();
					control.updateValueAndValidity();
				}
			});
			return;
		}
		this.taskService
			.updateTask(this.currentProject._id, this.taskService.taskToEdit._id, this.editTaskForm.value as Partial<Task>)
			.subscribe((data) => {
				console.log(data);
				this.toastService.success("Task has been updated!");
				this.editTaskEvent.emit(data as Task);
				this.editTaskForm.reset();
			});
	}

	get form() {
		return this.editTaskForm.controls;
	}
}
