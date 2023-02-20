import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import env from '../environment/environment.production';
import { Project } from '../interfaces/project.interface';
import { User } from '../interfaces/user.interface';

@Injectable({ providedIn: 'root' })
export class ProjectService {
	constructor(private httpClient: HttpClient) {}
	_projects: Array<Project> = [];
	getAllJoinedProjects() {
		return this.httpClient.get(env.baseUrl + '/projects');
	}

	getJoinedProject(id: string | number) {
		return this.httpClient.get(
			env.baseUrl + '/projects/' + id
		) as Observable<Project>;
	}

	createProject(data: Partial<Project>) {
		return this.httpClient.post(
			env.baseUrl + '/projects',
			data
		) as Observable<Project>;
	}

	addMember(projectId: string, userId: string) {
		return this.httpClient.patch(
			env.baseUrl + '/projects/' + projectId + '/add-member',
			{ member: userId }
		);
	}

	updateProject(projectId: string, data: Partial<Project>) {
		return this.httpClient.patch(
			env.baseUrl + '/projects/' + projectId,
			data
		);
	}
	deleteProject(projectId: string): Observable<Project> {
		return this.httpClient.delete(
			env.baseUrl + '/projects/' + projectId
		) as Observable<Project>;
	}

	get projects() {
		return this._projects;
	}
	set projects(data: Array<Project>) {
		this._projects = data;
	}
}
