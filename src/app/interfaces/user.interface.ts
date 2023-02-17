export interface User {
	_id: string;
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
	auth: string;
};

export type RegisterData = Omit<User, 'id'>;
