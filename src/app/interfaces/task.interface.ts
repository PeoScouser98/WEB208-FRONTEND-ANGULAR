import { Project } from './project.interface';
import { User } from './user.interface';

export interface Task {
	_id: string;
	title: string;
	description: string;
	assignee: Partial<User>;
	status: string;
	startedAt: Date;
	deadline: Date;
	project: Partial<Project>;
}
