import { Component } from '@angular/core';

import { ContainerOptions, DraggableOptions } from '../core/ngx-frenetiq-dnd';

@Component({
	selector: 'my-app', // <my-app></my-app> 
	templateUrl: './app.component.html',
})
export class AppComponent {

	dragoptionsI: DraggableOptions = {
		containerTags: { "foobar": true }
	}

	optionsI: ContainerOptions = {
		areChildrenDraggable: false
	}

	optionsII: ContainerOptions = {
		areChildrenDraggable: true
	}

	optionsIII: ContainerOptions = {
		isCloningDisabled: true
	}

	optionsIV: ContainerOptions = {
		containerTags: { "foobar": true }
	}

	optionsV: ContainerOptions = {
		containerTags: { "foobar": false }
	}
} 
