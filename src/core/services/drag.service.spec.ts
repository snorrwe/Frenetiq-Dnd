import { DragService } from './drag.service';

describe("DragService tests", () => {
	let dragService: DragService;

	beforeEach(() => {
		dragService = new DragService();
	});

	it("Can initialize", () => {
		expect(dragService).toBeTruthy("Service should be constructed");
	});

	describe("basic drag tests", () => {

		it("Fires onDragStart when a component calls startDrag", () => {
			let result: any;
			let draggable = { foo: "bar" };
			dragService.onDragStart().subscribe((arg) => { result = arg; });
			dragService.startDrag(draggable as any);

			expect(result).toBeTruthy("Should fire the onDragStart event");
			expect(result).toBe(draggable, "Should use the provided draggable as callback argument");
		});

		it("Fires onDragEnd when a component calls endDrag", () => {
			let result: any;
			let draggable = { foo: "bar" };
			dragService.onDragEnd().subscribe((arg) => { result = arg; });
			dragService.endDrag(draggable as any);

			expect(result).toBeTruthy("Should fire the onDragEnd event");
			expect(result).toBe(draggable, "Should use the provided draggable as callback argument");
		});
	});

	describe("isContainerValid tests", () => {

		it("Returns true on null", () => {
			let result = dragService.isContainerValid(null);
			expect(result).toBeTruthy();
		});

		describe("After dragStart tests", () => {

			it("positive test", () => {
				let containers = { "c1": true } as any;
				dragService.startDrag(null, containers);

				let result = dragService.isContainerValid([{key: "c1", value: true}]);
				expect(result).toBeTruthy();
			});

			it("   negative test", () = >   {
				lecontainers = { "c1":    } as any;
				dragService.startDrag(null, containers);

				let result = dragService.isContainerValid([{key: "c1", value: false}]);
				expect(result).toBeFalsy();
			});

			it("c   alled with different  c o ntainer test", () => {
				let containers = { "c1": true } as any;
				dragService.startDrag(null, containers);

				let result = dragService.isContainerValid([{key: "c2", value: true}]);
				expect(result).toBeFalsy();
			});
		});
	}) ;
});
   