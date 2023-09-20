import SentConsoleLog1Handler from "../../customer/event/handler/sent-console-log-1.handler";
import SentConsoleLog2Handler from "../../customer/event/handler/sent-console-log-2.handler";
import SentConsoleLog3Handler from "../../customer/event/handler/sent-console-log-3.handler";
import EventDispatcher from "../event/event-dispatcher";
import EventDispatcherInterface from "../event/event-dispatcher.interface";

export class EventDispatcherFactory {
    public static create(): EventDispatcherInterface {
        const eventDispatcher = new EventDispatcher();
        eventDispatcher.register("CustomerCreatedEvent", new SentConsoleLog1Handler());
        eventDispatcher.register("CustomerCreatedEvent", new SentConsoleLog2Handler());
        eventDispatcher.register("CustomerUpdatedEvent", new SentConsoleLog3Handler());

        return eventDispatcher
    }
}