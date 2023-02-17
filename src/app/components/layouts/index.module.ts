import { MemberListComponent } from './../shared/member-list/member-list.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { Homepage } from '../pages/homepage/homepage.component';
import { MemberPage } from './../pages/member-list/member-list.component';
import { ProjectPage } from '../pages/project-page/project-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from 'src/app/services/httpClientInterceptor.service';
import { AddTaskForm } from '../shared/add-task-form/add-task-form.component';
import { TasksList } from '../shared/task-list/task-list.component';

@NgModule({
	imports: [
		CommonModule,
		RouterLink,
		RouterLinkActive,
		DragDropModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
	],
	exports: [
		Homepage,
		MemberPage,
		ProjectPage,
		MemberListComponent,
		AddTaskForm,
		TasksList,
	],
	declarations: [
		Homepage,
		MemberPage,
		ProjectPage,
		MemberListComponent,
		AddTaskForm,
		TasksList,
	],
	providers: [
		{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
	],
})
export class DashboardModule {}
