import { AuthGuardService } from './../../../services/authGuard.service';
import { ToastService } from './../../../services/toast.service';
import { AuthService } from 'src/app/services/auth.service';
import {
	CdkDragDrop,
	moveItemInArray,
	transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Project } from 'src/app/interfaces/project.interface';
import { Task } from 'src/app/interfaces/task.interface';
import { ProjectService } from 'src/app/services/project.service';
import { TaskService } from 'src/app/services/task.service';
import { User } from 'src/app/interfaces/user.interface';

interface TaskList {
	listTitle: string;
	data: Array<Task>;
	connectedList: Array<string>;
	status: string;
	currentProject: Project;
	listId: string;
}

@Component({
	selector: 'app-project-page',
	templateUrl: './project-page.component.html',
})
export class ProjectPage {
	currentProject: Project | any = null;
	isFetching: boolean = false;
	isSearching: boolean = false;
	isError: boolean = false;
	isProjectCreator: boolean = false;
	taskList: Array<TaskList> = [];
	tasks: Array<Task> = [];
	searchTerm: string = '';
	searchResult: Array<Omit<User, 'password'>> = [];
	searchSubject = new Subject<string>();

	constructor(
		private activatedRouter: ActivatedRoute,
		public authGuardService: AuthGuardService,
		private router: Router,
		public projectService: ProjectService,
		public taskService: TaskService,
		private authService: AuthService,
		public toastService: ToastService
	) {
		this.searchSubject
			.pipe(
				debounceTime(1000),
				switchMap((term) => {
					return this.authService.findUser(term);
				})
			)
			.subscribe((data) => {
				this.isSearching = false;
				this.searchResult = (
					data as Array<Omit<User, 'password'>>
				).filter((user) =>
					this.currentProject.members.every(
						({ info }: { info: Partial<User> }) =>
							info._id != user._id
					)
				);
			});
	}

	ngOnInit() {
		this.activatedRouter.params.subscribe(({ id }) => {
			this.getCurrentProject(id);
			this.getTasksOfCurrentProject(id);
		});
	}

	// Add user to project
	addMemberToProject(userData: Partial<User>) {
		this.projectService
			.addMember(this.currentProject._id, userData._id as string)
			.subscribe(
				(data: Partial<Project> | Pick<Project, 'members'>) =>
					(this.currentProject.members = data.members)
			);
		this.toastService.info(`You have add ${userData.username} to project!`);
	}

	// Get current project
	getCurrentProject(id: string) {
		this.isFetching = true;
		this.projectService.getJoinedProject(id).subscribe(
			(data) => {
				console.log(data);
				this.currentProject = data as Project;
				this.isProjectCreator =
					data?.creator?._id ===
					this.authGuardService?.currentUser?._id;
				this.isFetching = false;
			},
			(error) => {
				console.log('[ERROR]:>>', error.error);
				this.isFetching = false;
				this.isError = true;
			}
		);
	}

	// Update project
	onUpdateProject(updatedProject: Project) {
		this.currentProject = updatedProject;
		this.projectService.projects = this.projectService.projects.map(
			(project) => {
				return project._id === updatedProject._id
					? updatedProject
					: project;
			}
		);
	}

	// Delete project
	deleteProject() {
		this.projectService.deleteProject(this.currentProject._id).subscribe(
			(data) => {
				this.toastService.info('Deleted project!');
				this.router.navigate(['/']);
				this.projectService.projects =
					this.projectService.projects.filter(
						(project) => project._id !== this.currentProject._id
					);
			},
			({ error }) => {
				this.toastService.error(error.message);
			}
		);
	}

	// Search user
	findUserByNameOrEmail() {
		this.isSearching = true;
		this.searchSubject.next(this.searchTerm);
	}

	// Filter task by status
	categorizeTaskByStatus(tasks: Array<Task>) {
		return [
			{
				data: tasks.filter((task) => task.status === 'TODO'),
				currentProject: this.currentProject,
				listTitle: 'todo',
				status: 'TODO',
			},
			{
				data: tasks.filter((task) => task.status === 'IN_PROGRESS'),
				currentProject: this.currentProject,
				listTitle: 'in progress',
				status: 'IN_PROGRESS',
			},
			{
				data: tasks.filter((task) => task.status === 'COMPLETED'),
				currentProject: this.currentProject,
				listTitle: 'completed',
				status: 'COMPLETED',
			},
		] as Array<TaskList>;
	}

	// Get all tasks of current project
	getTasksOfCurrentProject(projectId: string) {
		this.isFetching = true;
		this.taskService.getTasksByProject(projectId).subscribe((data) => {
			this.tasks = data as Array<Task>;
			this.taskList = this.categorizeTaskByStatus(data as Array<Task>);
		});
	}

	// Catch add task event
	onAddNewTask(newTask: Task) {
		this.tasks.push(newTask);
		this.taskList = this.categorizeTaskByStatus(this.tasks as Array<Task>);
	}

	// Catch edit task event
	onEditTask(editedTask: Task) {
		this.tasks = this.tasks.map((task: Task) => {
			return editedTask._id === task._id ? editedTask : task;
		}) as Array<Task>;
		this.taskList = this.categorizeTaskByStatus(this.tasks as Array<Task>);
	}

	// Update task's status using drag/drop
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
