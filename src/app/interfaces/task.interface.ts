import { Project } from "./project.interface";
import { User } from "./user.interface";

export interface Task {
	_id: string;
	title: string;
	creator: Omit<User, "password">;
	description: string;
	assignee: Omit<User, "password">;
	status: string;
	startedAt: Date | string;
	deadline: Date | string;
	project: Partial<Project>;
}
