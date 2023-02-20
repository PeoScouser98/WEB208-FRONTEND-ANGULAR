import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import env from '../environment/environment.production';
import { Task } from '../interfaces/task.interface';

@Injectable({ providedIn: 'root' })
export class TaskService {
	taskToEdit: Task | any;

	constructor(private httpClient: HttpClient) {}

	getTasksByProject(projectId: string) {
		return this.httpClient.get(env.baseUrl + '/tasks/' + projectId);
	}

	createTask(taskData: Partial<Task>, projectId: string) {
		return this.httpClient.post(
			env.baseUrl + '/tasks/' + projectId,
			taskData
		);
	}

	updateTask(
		projectId: string,
		taskId: string | number,
		updatedTaskData: Partial<Task>
	) {
		return this.httpClient.patch(
			env.baseUrl + '/tasks/' + taskId,
			updatedTaskData,
			{
				params: {
					projectId: projectId,
				},
			}
		);
	}

	deleteTask(taskId: string, projectId: string) {
		return this.httpClient.delete(env.baseUrl + '/tasks/' + taskId, {
			params: { projectId: projectId },
		});
	}
}
