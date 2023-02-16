import { Task } from './task.interface';
import { User } from './user.interface';

export enum ProjectStatus {
	FINISH,
	NOT_FINISH,
	CANCELLED,
}

export interface Project {
	id: number;
	projectName: string;
	members: Array<Omit<User, 'password'>>;
	tasks: Array<Task>;
}
