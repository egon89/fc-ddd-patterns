import OrderItem from "./order_item";

describe("OrderItem unit tests", () => {
    it("should calculate total", () => {
        const item = new OrderItem("i1", "Item 1", 100, "p1", 2);
        expect(item.total()).toBe(200);
    });

    it("should change quantity", () => {
        const item = new OrderItem("i1", "Item 1", 100, "p1", 2);
        item.changeQuantity(3);
        expect(item.total()).toBe(300);
    });

    it.each([0, -1])(
        "should throw error if the item quantity is less or equal zero 0",
        (quantity) => {
            expect(() => {
                const item = new OrderItem("i1", "Item 1", 100, "p1", 2);
                item.changeQuantity(quantity);
            }).toThrowError("Quantity must be greater than 0");
        }
    );
});
