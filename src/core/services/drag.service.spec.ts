import { DragService } from './drag.service';

describe("DragService tests", () => {
	let service: DragService;

	beforeEach(() => {
		service = new DragService();
	});

	it("Can initialize", () => {
		expect(service).toBeTruthy("Service should be constructed");
	});

	describe("basic drag tests", () => {

		it("Fires onDragStart when a component calls startDrag", () => {
			let result:any;
			let draggable = {foo: "bar"};
			service.onDragStart().subscribe((arg) => { result = arg; });
			service.startDrag(draggable as any);

			expect(result).toBeTruthy("Should fire the onDragStart event");
			expect(result).toBe(draggable, "Should use the provided draggable as callback argument");
		});

		it("Fires onDragEnd when a component calls endDrag", ()=>{
			let result: any;
			let draggable = {foo: "bar"};
			service.onDragEnd().subscribe((arg)=> {result = arg;});
			service.endDrag(draggable as any);

			expect(result).toBeTruthy("Should fire the onDragEnd event");
			expect(result).toBe(draggable, "Should use the provided draggable as callback argument");
		});
	});
});
