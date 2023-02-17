import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import env from '../environment/environment.dev';
import { Project } from '../interfaces/project.interface';

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
	createProject(data: any) {
		return this.httpClient.post(env.baseUrl + '/projects', data);
	}
	get projects() {
		return this._projects;
	}
	set projects(data: Array<Project>) {
		this._projects = data;
	}
}
