import { MemberListComponent } from './../shared/member-list/member-list.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { Homepage } from '../pages/homepage/homepage.component';
import { MemberPage } from './../pages/member-list/member-list.component';
import { ProjectPage } from '../pages/project-page/project-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
	imports: [
		CommonModule,
		RouterLink,
		RouterLinkActive,
		DragDropModule,
		FormsModule,
		ReactiveFormsModule,
	],
	exports: [Homepage, MemberPage, ProjectPage, MemberListComponent],
	declarations: [Homepage, MemberPage, ProjectPage, MemberListComponent],
	providers: [],
})
export class DashboardModule {}
