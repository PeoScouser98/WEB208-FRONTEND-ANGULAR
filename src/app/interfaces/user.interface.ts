export interface User {
	id: number | string;
	email: string;
	password: string;
	username: string;
	photoUrl: string;
}

export interface Member extends User {
	isMember: boolean;
	isLeader?: boolean;
	joinInDate: Date;
}

export type LoginData = {
	accessToken: string;
	user: Omit<User, 'password'>;
};

export type RegisterData = Omit<User, 'id'>;
