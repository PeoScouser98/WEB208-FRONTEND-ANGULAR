import { User } from './user.interface';
export enum Status {
	todo = 'todo',
	inProgress = 'in_progress',
	done = 'done',
}
export interface Task {
	id: number;
	title: string;
	description: string;
	startedAt: Date;
	assignees: Array<Pick<User, 'id' & 'username' & 'photoUrl'>>;
	estimatedFishingDate: Date;
	status: string;
	priority: number;
	projectId: number;
}
