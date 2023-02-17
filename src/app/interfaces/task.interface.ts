import { User } from './user.interface';
export enum Status {
	todo = 'todo',
	inProgress = 'in_progress',
	done = 'done',
}
export interface Task {
	_id: string;
	title: string;
	description: string;
	startedAt: Date;
	assignee: Partial<User>;
	status: string;
	deadline: Date;
	project: number;
}
