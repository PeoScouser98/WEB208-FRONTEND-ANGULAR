import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import env from '../environment/environment.dev';
import { Task } from '../interfaces/task.interface';

@Injectable({ providedIn: 'root' })
export class TaskService {
	constructor(private httpClient: HttpClient) {}

	createTask(taskData: Partial<Task>) {
		return this.httpClient.post(env.baseUrl + '/task', taskData);
	}
	updateTask(taskId: string | number, updatedTaskData: Partial<Task>) {
		console.log(taskId);
		return this.httpClient.patch(
			env.baseUrl + '/tasks/' + taskId,
			updatedTaskData
		);
	}
	deleteTask(taskId: string | number) {
		return this.httpClient.delete(env.baseUrl + '/tasks/' + taskId);
	}
}
