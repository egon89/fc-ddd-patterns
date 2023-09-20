import CustomerCreatedEvent from "../../customer/event/customer-created.event";
import CustomerUpdatedEvent from "../../customer/event/customer-updated.event";
import SentConsoleLog1Handler from "../../customer/event/handler/sent-console-log-1.handler";
import SentConsoleLog2Handler from "../../customer/event/handler/sent-console-log-2.handler";
import SentConsoleLog3Handler from "../../customer/event/handler/sent-console-log-3.handler";
import Address from "../../customer/value-object/address";
import EventDispatcher from "./event-dispatcher";
import { v4 as uuid } from "uuid";


describe("Customer events", () => {
  it('should register events for created customer', () => {
    const eventDispatcher = new EventDispatcher();
    const firstEventHandler = new SentConsoleLog1Handler();
    const secondEventHandler = new SentConsoleLog2Handler();

    eventDispatcher.register("CustomerCreatedEvent", firstEventHandler);
    eventDispatcher.register("CustomerCreatedEvent", secondEventHandler);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(
      2
    );
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
    ).toMatchObject([firstEventHandler, secondEventHandler]);
  });

  it('should notify all event handlers for created customer', () => {
    const eventDispatcher = new EventDispatcher();
    const firstEventHandler = new SentConsoleLog1Handler();
    const secondEventHandler = new SentConsoleLog2Handler();
    const spyFirstEventHandler = jest.spyOn(firstEventHandler, 'handle');
    const spySecondEventHandler = jest.spyOn(secondEventHandler, 'handle');
    eventDispatcher.register("CustomerCreatedEvent", firstEventHandler);
    eventDispatcher.register("CustomerCreatedEvent", secondEventHandler);
    const event = new CustomerCreatedEvent();

    eventDispatcher.notify(event);

    expect(spyFirstEventHandler).toHaveBeenCalled();
    expect(spySecondEventHandler).toHaveBeenCalled();
  });

  it('should register events for updated customer', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SentConsoleLog3Handler();

    eventDispatcher.register("CustomerUpdatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["CustomerUpdatedEvent"]
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers["CustomerUpdatedEvent"].length).toBe(
      1
    );
    expect(
      eventDispatcher.getEventHandlers["CustomerUpdatedEvent"][0]
    ).toMatchObject(eventHandler);
  });

  it('should notify all event handlers for updated customer', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SentConsoleLog3Handler();
    const spyEventHandler = jest.spyOn(eventHandler, 'handle');
    eventDispatcher.register("CustomerUpdatedEvent", eventHandler);
    const event = new CustomerUpdatedEvent({
      id: uuid(),
      name: 'Customer 1',
      address: new Address('Street 1', 123, '13330250', 'City 1')
    });

    eventDispatcher.notify(event);

    expect(spyEventHandler).toHaveBeenCalled();
  });
});
