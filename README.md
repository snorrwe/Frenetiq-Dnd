# Overview
A simple, but working drag'n'drop framework for Angular2

# Installation
Run `npm install --save ngx-frenetiq-dnd`

# Demo
There's a very basic demo available at [https://snorrwe.github.io/frenetiq-dnd](https://snorrwe.github.io/frenetiq-dnd)

# Usage

* Import the `ngx-frenetiq-dnd` *Module* into your *Module*

```js

import { FrenetiqDnd } from 'ngx-frenetiq-dnd/ngx-frenetiq-dnd';

@NgModule({
	//....
    imports: [
        FrenetiqDnd
    ]
    //....
})
export class AppModule {
}

```

* Make html elements draggable with the `frenetiq-draggable` directive.
* See the [Wiki](https://github.com/snorrwe/Frenetiq-Dnd/wiki/FrenetiqDraggable) for more information about the directive and its options.

```html

<div frenetiq-draggable>
	<p>Drag me!</p>
</div>

<div #someName="frenetiq-draggable">
	<p>Drag me!</p>
</div>

```

* Make html elements drop targets with the `frenetiq-container` directive.
* See the [Wiki](https://github.com/snorrwe/Frenetiq-Dnd/wiki/FrenetiqContainer) for more information about the directive and its options.

```html

<div frenetiq-container></div>

<div #someName="frenetiq-container"></div>

```

* CSS
	* FrenetiqDnd uses the `fren-drag` css class on items that are being _dragged_ 
	* FrenetiqDnd uses the `fren-hover` css class on valid containers when you _drag_ an item over it.

```css

.fren-drag{
	background-color:red; /* Make dragged items red */	
}

```

* You can listen to events either via the *Directives* or by subscribing to the `DragService`
* See the [Wiki](https://github.com/snorrwe/Frenetiq-Dnd/wiki/DragService) for more information about the service and its API.

```js

@Component({
	template: `
	<div frenetiq-container>
			<div frenetiq-draggable [parent]="this" (onDragEnd)="onDragEnd($event)">Drag me!</div>
	</div>
`
})
class SomeComponent {
	constructor(private dragService: DragService) {
		this.dragService
		    .onDragEnd()
		    .subscribe((draggable) => {
		        if (draggable.parent === this) {
		            //Draggable has been dropped on its parent.
		            console.log("Oh, you're back!", draggable, this);
		        }
		    });
	}

	private onDragEnd(draggable) {
		console.log("Child has been released!", draggable, this);
	}

}

```

# Sample code

**_TBA_**

# API Documentation

Please refer to the [Wiki](https://github.com/snorrwe/Frenetiq-Dnd/wiki/)

# Contributing
## Build files

* single run: `npm run build`
* build files and watch: `npm run watch`

## Testing
* Please note that all pull requests must pass the tests in order to be merged into _master_. 
This project uses [https://travis-ci.org](https://travis-ci.org) to enforce successful builds on _master_.

* Running the tests locally:
	* single run: `npm run test`
	* watch: `npm run test-watch`

# Credits

* Project setup based on [angular2-webpack](https://github.com/preboot/angular2-webpack)
* Testing strategies found from [Angular —  Unit Testing recipes by Gerard Sans](https://medium.com/google-developer-experts/angular-2-unit-testing-with-jasmine-defe20421584)
* [![codebeat badge](https://codebeat.co/badges/57556947-9843-487f-aa3d-abcbb7daf7b0)](https://codebeat.co/projects/github-com-snorrwe-frenetiq-dnd-master)

# License

[MIT](/LICENSE)
