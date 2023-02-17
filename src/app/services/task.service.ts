import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import env from '../environment/environment.dev';
import { Task } from '../interfaces/task.interface';

@Injectable({ providedIn: 'root' })
export class TaskService {
	constructor(private httpClient: HttpClient) {}
	getTasksByProject(projectId: string) {
		return this.httpClient.get(env.baseUrl + '/tasks/' + projectId);
	}
	createTask(taskData: Partial<Task>) {
		return this.httpClient.post(env.baseUrl + '/tasks', taskData);
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
	deleteTask(taskId: string | number) {
		return this.httpClient.delete(env.baseUrl + '/tasks/' + taskId);
	}
}
