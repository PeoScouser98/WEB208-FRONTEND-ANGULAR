import { Task } from './task.interface';
import { User } from './user.interface';

export interface Project {
	_id: string;
	projectName: string;
	creator: Omit<User, 'password'>;
	members: Array<Omit<User, 'password'> | any>;
	createdAt: Date;
	updatedAt: Date;
	customer?: string;
	budget: number;
	estimatedCompleteDate: Date;
	status: string;
	tasks?: Array<Task>;
	inCompleted?: number;
	completed?: number;
}
