import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterLink } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Dashboard } from './components/layouts/index.component';
import { DashboardModule } from './components/layouts/index.module';
import { LoginPage } from './components/pages/login/login.component';
import { NotFoundPage } from './components/pages/not-found/not-found.component';
import { RegisterPage } from './components/pages/register/register.component';
import { ToastComponent } from './components/shared/toast/toast.component';

@NgModule({
	declarations: [
		AppComponent,
		Dashboard,
		LoginPage,
		RegisterPage,
		ToastComponent,
		NotFoundPage,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		CommonModule,
		DashboardModule,
		RouterLink,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		BrowserAnimationsModule,
		DragDropModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
