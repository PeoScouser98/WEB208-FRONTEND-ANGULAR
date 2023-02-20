import {
	Component,
	OnInit,
	Output,
	EventEmitter,
	Input,
	OnChanges,
	SimpleChange,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Project } from 'src/app/interfaces/project.interface';
import { ProjectService } from 'src/app/services/project.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
	selector: 'edit-project-form',
	templateUrl: 'edit-project-form.component.html',
})
export class EditProjectForm implements OnInit, OnChanges {
	@Input() currentProject: Project | any;
	@Output() editProjectEvent = new EventEmitter<Project>();

	editProjectForm = new FormGroup({
		projectName: new FormControl('', [
			Validators.required,
			Validators.minLength(3),
		]),
	});

	constructor(
		public projectService: ProjectService,
		private toastService: ToastService,
		private router: Router
	) {}

	ngOnInit() {}

	ngOnChanges() {
		this.editProjectForm.patchValue({
			projectName: this.currentProject.projectName,
		});
	}

	onSubmit() {
		if (this.editProjectForm.invalid) {
			Object.values(this.form).forEach((control) => {
				if (control.invalid) {
					control.markAsDirty();
					control.updateValueAndValidity();
				}
			});
			return;
		}
		this.projectService
			.updateProject(
				this.currentProject._id,
				this.editProjectForm.value as Partial<Project>
			)
			.subscribe((data) => {
				this.toastService.success('Updated project');
				this.editProjectEvent.emit(data as Project);
			});
	}

	get form() {
		return this.editProjectForm.controls;
	}
}
