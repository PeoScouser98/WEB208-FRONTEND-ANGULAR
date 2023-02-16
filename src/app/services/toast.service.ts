import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class ToastService {
	message: string = '';
	_type: string = '';
	_show: boolean = false;

	constructor() {}
	private subject = new Subject<string>();

	getMessage() {
		return this.subject.asObservable();
	}

	success(message: string) {
		console.log(message);
		this.message = message;
		this.type = 'alert-success';
		this.show = true;
		console.log(this.type);
		console.log(this.show);
		setTimeout(() => {
			this.show = false;
		}, 2000);
	}
	info(message: string) {
		this.message = message;
		this.type = 'alert-info';
		this.show = true;
		setTimeout(() => {
			this.show = false;
		}, 2000);
	}
	error(message: string) {
		this.message = message;
		this.type = 'alert-error';
		this.show = true;
		setTimeout(() => {
			this.show = false;
		}, 2000);
	}
	get show() {
		return this._show;
	}
	get type() {
		return this._type;
	}
	set show(val: any) {
		this._show = val;
	}
	set type(val: any) {
		this._type = val;
	}
}
