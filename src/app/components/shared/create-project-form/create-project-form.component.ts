import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Project } from "src/app/interfaces/project.interface";
import { ProjectService } from "src/app/services/project.service";
import { ToastService } from "src/app/services/toast.service";
@Component({
	selector: "create-project-form",
	templateUrl: "create-project-form.component.html",
})
export class CreateProjectForm implements OnInit {
	@Output() createProjectEvent = new EventEmitter<Project>();

	constructor(private projectService: ProjectService, private toastService: ToastService, private router: Router) {}
	createProjectForm = new FormGroup({
		projectName: new FormControl("", [Validators.required, Validators.minLength(3)]),
		budget: new FormControl("", [Validators.required]),
		customer: new FormControl(""),
		estimatedCompleteDate: new FormControl("", [Validators.required]),
	});

	ngOnInit() {}

	onSubmit() {
		if (this.createProjectForm.invalid) {
			Object.values(this.form).forEach((control) => {
				if (control.invalid) {
					control.markAsDirty();
					control.updateValueAndValidity();
				}
			});
			return;
		}
		this.projectService.createProject(this.createProjectForm.value as Partial<Project>).subscribe(
			(data: Project) => {
				this.toastService.success("Created new project");
				this.router.navigate(["/project/:id"], data._id as any);
				this.createProjectEvent.emit(data);
				this.createProjectForm.reset();
			},
			({ error }) => {
				this.toastService.error("Opps! Something went wrong!");
				console.log(error);
			}
		);
	}

	get form() {
		return this.createProjectForm.controls;
	}
}
