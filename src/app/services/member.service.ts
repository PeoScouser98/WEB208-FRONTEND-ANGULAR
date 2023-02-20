import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import env from '../environment/environment.production';
import { Member, User } from '../interfaces/user.interface';

@Injectable({ providedIn: 'root' })
export class MemberService {
	_members: Array<Member> = [];
	constructor(private httpClient: HttpClient) {}

	getMembersList() {
		return this.httpClient.get(env.baseUrl + '/users', {
			params: { isMember: true },
		});
	}
	getMemberInfo(id: number | string) {
		return this.httpClient.get(env.baseUrl + '/users/' + id);
	}
	get members() {
		return this._members;
	}
	set members(data: Array<Member>) {
		this._members = data;
	}
}
