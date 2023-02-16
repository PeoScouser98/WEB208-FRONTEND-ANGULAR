import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import env from '../environment/environment.dev';
import { Project } from '../interfaces/project.interface';
@Injectable({ providedIn: 'root' })
export class ProjectService {
	constructor(private httpClient: HttpClient) {}
	_projects: Array<Project> = [];
	getAllProjects() {
		return this.httpClient.get(env.baseUrl + '/projects');
	}
	getProject(id: string | number) {
		return this.httpClient.get(env.baseUrl + '/projects/' + id, {
			params: {
				_embed: 'tasks',
			},
		}) as Observable<Project>;
	}
	createProject(data: any) {
		return this.httpClient.post(env.baseUrl + '/projects', data, {
			headers: {
				authorization: 'Bearer ' + localStorage.getItem('accessToken'),
			},
		});
	}
	get projects() {
		return this._projects;
	}
	set projects(data: Array<Project>) {
		this._projects = data;
	}
}
