import { Component } from '@angular/core';

import { ContainerOptions, DraggableOptions } from '../core/ngx-frenetiq-dnd';

@Component({
	selector: 'my-app', // <my-app></my-app> 
	templateUrl: './app.component.html',
})
export class AppComponent {

	dragoptionsI: DraggableOptions = {
		enabledContainers: { "foobar": true }
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
		enabledContainers: { "foobar": true }
	}

	optionsV: ContainerOptions = {
		enabledContainers: { "foobar": false }
	}
} 
