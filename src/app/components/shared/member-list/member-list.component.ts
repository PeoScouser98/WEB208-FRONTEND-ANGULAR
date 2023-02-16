import { Component, OnInit } from '@angular/core';
import { Member, User } from 'src/app/interfaces/user.interface';
import { MemberService } from 'src/app/services/member.service';

@Component({
	selector: 'app-member-list',
	templateUrl: './member-list.component.html',
})
export class MemberListComponent implements OnInit {
	constructor(public memberService: MemberService) {}

	ngOnInit() {
		this.memberService
			.getMembersList()
			.subscribe(
				(data) => (this.memberService.members = data as Array<Member>)
			);
	}
}
