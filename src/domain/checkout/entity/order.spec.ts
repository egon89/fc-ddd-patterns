import Order from "./order";
import OrderItem from "./order_item";

describe("Order unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      let order = new Order("", "123", []);
    }).toThrowError("Id is required");
  });

  it("should throw error when customerId is empty", () => {
    expect(() => {
      let order = new Order("123", "", []);
    }).toThrowError("CustomerId is required");
  });

  it("should throw error when customerId is empty", () => {
    expect(() => {
      let order = new Order("123", "123", []);
    }).toThrowError("Items are required");
  });

  it("should calculate total", () => {
    const item = new OrderItem("i1", "Item 1", 100, "p1", 2);
    const item2 = new OrderItem("i2", "Item 2", 200, "p2", 2);
    const order = new Order("o1", "c1", [item]);

    let total = order.total();

    expect(order.total()).toBe(200);

    const order2 = new Order("o1", "c1", [item, item2]);
    total = order2.total();
    expect(total).toBe(600);
  });

  it("should change item quantity", () => {
    const item = new OrderItem("i1", "Item 1", 100, "p1", 2);
    const order = new Order("o1", "c1", [item]);

    order.changeItemQuantityById("i1", 3);

    expect(order.total()).toBe(300);
  });

  it.each([0, -1])(
    "should throw error if the item quantity is less or equal zero 0",
    (quantity) => {
      expect(() => {
        const item = new OrderItem("i1", "Item 1", 100, "p1", 2);
        const order = new Order("o1", "c1", [item]);
        order.changeItemQuantityById("i1", quantity);
      }).toThrowError("Quantity must be greater than 0");
    }
  );

  it("should throw error if the item is not found", () => {
    expect(() => {
      const item = new OrderItem("i1", "Item 1", 100, "p1", 2);
      const order = new Order("o1", "c1", [item]);
      order.changeItemQuantityById("i2", 3);
    }).toThrowError("Item not found");
  });

  it("should add items", () => {
    const item = new OrderItem("i1", "Item 1", 100, "p1", 1);
    const order = new Order("o1", "c1", [item]);

    const item2 = new OrderItem("i2", "Item 2", 200, "p2", 1);
    const item3 = new OrderItem("i3", "Item 3", 300, "p3", 1);
    order.addItems([item2, item3]);

    expect(order.total()).toBe(600);
  });

  it("should remove items", () => {
    const item = new OrderItem("i1", "Item 1", 100, "p1", 1);
    const item2 = new OrderItem("i2", "Item 2", 200, "p2", 1);
    const item3 = new OrderItem("i3", "Item 3", 300, "p3", 1);
    const order = new Order("o1", "c1", [item, item2, item3]);

    order.removeItemsById(["i1", "i2"]);

    expect(order.total()).toBe(300);
  });

  it("should not remove items if not found", () => {
    const item = new OrderItem("i1", "Item 1", 100, "p1", 1);
    const item2 = new OrderItem("i2", "Item 2", 200, "p2", 1);
    const item3 = new OrderItem("i3", "Item 3", 300, "p3", 1);
    const order = new Order("o1", "c1", [item, item2, item3]);

    order.removeItemsById(["i1", "i4"]);

    expect(order.total()).toBe(500);
  });
});
