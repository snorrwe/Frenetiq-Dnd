import { Component } from '@angular/core';

@Component({
	selector: 'hello'
	, template: '<h1>Helllooooo</h1>'
})
export class HelloComponent{
	constructor(){
		console.log("Hello from new hello!");
	}
}