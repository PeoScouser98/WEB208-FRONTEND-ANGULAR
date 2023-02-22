import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'src/app/services/authGuard.service';
import { Dashboard } from './components/layouts/index.component';
import { Homepage } from './components/pages/homepage/homepage.component';
import { LoginPage } from './components/pages/login/login.component';
import { NotFoundPage } from './components/pages/not-found/not-found.component';
import { ProjectPage } from './components/pages/project-page/project-page.component';
import { RegisterPage } from './components/pages/register/register.component';
const routes: Routes = [
	{
		path: '',
		component: Dashboard,
		canActivate: [AuthGuardService],
		children: [
			{
				path: '',
				redirectTo: 'home',
				pathMatch: 'full',
			},
			{
				path: 'home',
				component: Homepage,
			},

			{
				path: 'projects/:id',
				component: ProjectPage,
			},
		],
	},
	{
		path: 'login',
		component: LoginPage,
	},
	{
		path: 'register',
		component: RegisterPage,
	},
	{
		path: '**',
		component: NotFoundPage,
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
