import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerUpdatedEvent from "../customer-updated.event";

export default class SentConsoleLog3Handler implements EventHandlerInterface<CustomerUpdatedEvent> {
  handle(event: CustomerUpdatedEvent): void {
    console.log(
      `Address of customer ${event.eventData.id}, ${event.eventData.name} has been updated to ${event.eventData.address}`);
  }
}
