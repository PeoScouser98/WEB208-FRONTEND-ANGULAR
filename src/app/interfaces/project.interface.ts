import { Task } from './task.interface';
import { User } from './user.interface';

export enum ProjectStatus {
	FINISH,
	NOT_FINISH,
	CANCELLED,
}

export interface Project {
	_id: string;
	projectName: string;
	creator: Partial<User>;
	members: Array<Omit<User, 'password'>>;
}
