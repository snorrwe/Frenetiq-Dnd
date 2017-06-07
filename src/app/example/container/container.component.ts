import { Component, Input } from '@angular/core';
import { ContainerOptions } from '../../../core/ngx-frenetiq-dnd'

@Component({
	selector: 'app-container'
	, template: `
	<div *ngIf="title && options" style="margin-left: 1vw;">
		<h4>{{title}}</h4>
		<div frenetiq-container
			 [options]="options"
			 [ngStyle]="{'background-color': color}" 
		 	 style="width: 200px; height: 200px;">
		</div>
		<pre>{{optionsString}}</pre>
	</div>
`
})
export class ContainerComponent {
	@Input("options") private options: ContainerOptions;
	@Input("title") private title: string;
	@Input("color") private color: string;

	get optionsString(){
		return JSON.stringify(this.options, null, 2);
	}
}
